"use client";

import {
    createContext,
    CSSProperties,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from "react";

import { EditorBtns } from "@/interfaces";
import { EditorAction } from "./editor-actions";

// Tipagem dos dispositivos de exibição
export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

// Tipagem das opções de componentes do editor
export type EditorElement = {
    id: string;
    styles: CSSProperties;
    name: string;
    type: EditorBtns; // Tipo pré-definido do elemento
    content: EditorElement[] | {}; // Essa propriedade varia de acordo com o tipo do elemento
};

// Tipagem do editor em si
export type Editor = {
    funnelPageId: string;
    liveMode: boolean;
    previewMode: boolean;
    device: DeviceTypes;
    selectedElement: EditorElement;
    elements: EditorElement[];
};

// Tipagem do histórico de estados do editor (Toda e qualquer edição gera um novo estado do editor como um todo, que é salvo de acordo com esta interface)
export type HistoryState = {
    history: Editor[]; // dados do editor naquela versão
    currentIndex: number; // Número da versão, quanto maior mais recente ela é
};

// Tipagem para o estado atual do editor
export type EditorState = {
    editor: Editor;
    history: HistoryState;
};

// Tipagem que no vídeo era do prisma/client
export type FunnelPage = {
    id: string;
    funnelId: string;
    name: string;
    pathName: string;
    visits: number;
    content: string;
    order: number;
    previewImage?: string;
    createdAt: Date;
    updatedAt: Date;
};

const initialEditorState: EditorState["editor"] = {
    funnelPageId: "",
    liveMode: false,
    previewMode: false,
    device: "Desktop",
    elements: [
        {
            id: "__body",
            name: "Body",
            type: "__body",
            styles: {},
            content: [],
        },
    ],
    selectedElement: {
        id: "",
        name: "",
        type: null,
        styles: {},
        content: [],
    },
};

const initialHistoryState: HistoryState = {
    history: [initialEditorState],
    currentIndex: 0,
};

const initialState: EditorState = {
    editor: initialEditorState,
    history: initialHistoryState,
};

const addAnElement = (
    editorArray: EditorElement[],
    action: EditorAction
): EditorElement[] => {
    if (action.type !== "ADD_ELEMENT") {
        throw Error(
            "You sent the wrong action type to the Add Element editor State"
        );
    }
    return editorArray.map((item) => {
        if (
            item.id === action.payload.containerId &&
            Array.isArray(item.content)
        ) {
            return {
                ...item,
                // @ts-expect-error: err
                content: [...item.content, action.payload.elementDetails],
            };
        } else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content: addAnElement(item.content, action),
            };
        }
        return item;
    });
};

const updateAnElement = (
    editorArray: EditorElement[],
    action: EditorAction
): EditorElement[] => {
    if (action.type !== "UPDATE_ELEMENT") {
        throw Error(
            "You sent the wrong action type to the Add Element editor State"
        );
    }
    return editorArray.map((item) => {
        if (item.id === action.payload.elementDetails.id) {
            return {
                ...item,
                ...action.payload.elementDetails,
            };
        } else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content: updateAnElement(item.content, action),
            };
        }
        return item;
    });
};

const deleteAnElement = (
    editorArray: EditorElement[],
    action: EditorAction
): EditorElement[] => {
    if (action.type !== "DELETE_ELEMENT") {
        throw Error(
            "You sent the wrong action type to the Add Element editor State"
        );
    }
    // @ts-expect-error: Foi o que o cara do vídeo fez às 12:29:53
    return editorArray.map((item) => {
        if (item.id === action.payload.elementDetails.id) {
            return false;
        } else if (item.content && Array.isArray(item.content)) {
            item.content = deleteAnElement(item.content, action);
        }
        return true;
    });
};

const editorReducer = (
    state: EditorState = initialState,
    action: EditorAction
): EditorState => {
    switch (action.type) {
        case "ADD_ELEMENT":
            const updatedEditorState = {
                ...state.editor,
                elements: addAnElement(state.editor.elements, action),
            };

            // Update the history to include the entire updated EditorState
            const updatedHistory = [
                ...state.history.history.slice(
                    0,
                    state.history.currentIndex + 1
                ),
                { ...updatedEditorState },
            ];

            const newEditorState = {
                ...state,
                editor: updatedEditorState,
                history: {
                    ...state.history,
                    updatedHistory,
                    currentIndex: updatedHistory.length - 1,
                },
            };

            return newEditorState;
        case "UPDATE_ELEMENT":
            const updatedElements = updateAnElement(
                state.editor.elements,
                action
            );

            const UpdatedElementIsSelected =
                state.editor.selectedElement.id ===
                action.payload.elementDetails.id;

            const updatedEditorStateWithUpdate = {
                ...state.editor,
                elements: updatedElements,
                selectedElement: UpdatedElementIsSelected
                    ? action.payload.elementDetails
                    : {
                          id: "",
                          name: "",
                          type: null,
                          styles: {},
                          content: [],
                      },
            };

            const updateHistoryWithUpdate = [
                ...state.history.history.slice(
                    0,
                    state.history.currentIndex + 1
                ),
                { ...updatedEditorStateWithUpdate },
            ];

            const updatedEditor = {
                ...state,
                editor: updatedEditorStateWithUpdate,
                history: {
                    ...state.history,
                    history: updateHistoryWithUpdate,
                    currentIndex: updateHistoryWithUpdate.length - 1,
                },
            };

            return updatedEditor;
        case "DELETE_ELEMENT":
            const updatedElementsAfterDelete = deleteAnElement(
                state.editor.elements,
                action
            );

            const updatedEditorStateAfterDelete = {
                ...state.editor,
                elements: updatedElementsAfterDelete,
            };

            const updateHistoryAfterDelete = [
                ...state.history.history.slice(
                    0,
                    state.history.currentIndex + 1
                ),
                { ...updatedEditorStateAfterDelete },
            ];

            const deletedState = {
                ...state,
                editor: updatedEditorStateAfterDelete,
                history: {
                    ...state.history,
                    history: updateHistoryAfterDelete,
                    currentIndex: updateHistoryAfterDelete.length - 1,
                },
            };

            return deletedState;
        case "CHANGE_CLICKED_ELEMENT":
            const clickedState: EditorState = {
                ...state,
                editor: {
                    ...state.editor,
                    selectedElement: action.payload.elementDetails || {
                        id: "",
                        name: "",
                        type: null,
                        styles: {},
                        content: [],
                    },
                },
                history: {
                    ...state.history,
                    history: [
                        ...state.history.history.slice(
                            0,
                            state.history.currentIndex + 1
                        ),
                        { ...state.editor },
                    ],
                    currentIndex: state.history.currentIndex + 1,
                },
            };

            return clickedState;
        case "CHANGE_DEVICE":
            const changedDeviceState = {
                ...state,
                editor: {
                    ...state.editor,
                    device: action.payload.device,
                },
            };

            return changedDeviceState;
        case "TOGGLE_PREVIEW_MODE":
            const toggleState = {
                ...state,
                editor: {
                    ...state.editor,
                    previewMode: !state.editor.previewMode,
                },
            };

            return toggleState;
        case "TOGGLE_LIVE_MODE":
            const toggleLiveMode = {
                ...state,
                editor: {
                    ...state.editor,
                    liveMode: action.payload
                        ? action.payload.value
                        : !state.editor.liveMode,
                },
            };

            return toggleLiveMode;
        case "REDO":
            if (state.history.currentIndex < state.history.history.length - 1) {
                const nextIndex = state.history.currentIndex + 1;
                const nextEditorState = { ...state.history.history[nextIndex] };
                const redoState = {
                    ...state,
                    editor: nextEditorState,
                    history: {
                        ...state.history,
                        currentIndex: nextIndex,
                    },
                };

                return redoState;
            }

            return state;
        case "UNDO":
            if (state.history.currentIndex > 0) {
                const prevIndex = state.history.currentIndex - 1;
                const prevEditorState = { ...state.history.history[prevIndex] };
                const undoState = {
                    ...state,
                    editor: prevEditorState,
                    history: {
                        ...state.history,
                        currentIndex: prevIndex,
                    },
                };

                return undoState;
            }

            return state;
        case "LOAD_LOCALSTORAGE": // OBS: Não está usando
            const dataFromStorage = localStorage.getItem(
                action.payload.funnelPageId
            );
            if (dataFromStorage) return JSON.parse(dataFromStorage);
            else return state;
        case "LOAD_DATA":
            return {
                ...initialState,
                editor: {
                    ...initialState.editor,
                    elements:
                        action.payload.elements || initialEditorState.elements,
                    liveMode: !!action.payload.withLive,
                },
            };
        case "SET_FUNNELPAGE_ID":
            const { funnelPageId } = action.payload;
            const updatedEditorStateWithFunnelPageId = {
                ...state.editor,
                funnelPageId,
            };

            const updateHistoryWithFunnelPageId = [
                ...state.history.history.slice(
                    0,
                    state.history.currentIndex + 1
                ),
                { ...updatedEditorStateWithFunnelPageId },
            ];

            const funnelPageIdState = {
                ...state,
                editor: updatedEditorStateWithFunnelPageId,
                history: {
                    history: updateHistoryWithFunnelPageId,
                    currentIndex: updateHistoryWithFunnelPageId.length - 1,
                },
            };

            return funnelPageIdState;
        default:
            return state;
    }
};

export type EditorContextData = {
    device: DeviceTypes;
    previewMode: boolean;
    setPreviewMode: (previewMode: boolean) => void;
    setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
    state: EditorState;
    dispatch: Dispatch<EditorAction>;
    subaccountId: string;
    funnelId: string;
    pageDetails: FunnelPage | null;
}>({
    state: initialState,
    dispatch: () => undefined,
    subaccountId: "",
    funnelId: "",
    pageDetails: null,
});

type EditorProps = {
    children: ReactNode;
    subaccountId: string;
    funnelId: string;
    pageDetails: FunnelPage;
};

const EditorProvider = (props: EditorProps) => {
    const [state, dispatch] = useReducer(editorReducer, initialState);

    return (
        <EditorContext.Provider
            value={{
                state,
                dispatch,
                subaccountId: props.subaccountId,
                funnelId: props.funnelId,
                pageDetails: props.pageDetails,
            }}
        >
            {props.children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error(
            "useEditor Hook must be used within the editor Provider"
        );
    }
    return context;
};

export default EditorProvider;
