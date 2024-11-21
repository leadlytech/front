export default function Loading() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4">Carregando...</p>
        </div>
    );
}
