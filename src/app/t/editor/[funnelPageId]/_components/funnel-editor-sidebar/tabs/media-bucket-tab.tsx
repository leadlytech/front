"use client";
import MediaComponent from "@/components/custom/media";
import React, { useEffect, useState } from "react";

type Props = {
    subaccountId: string;
};

async function getMedia(subaccountId: string): null {
    return null;
}

const MediaBucketTab = (props: Props) => {
    const [data, setdata] = useState<null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMedia(props.subaccountId);
            setdata(response);
        };
        fetchData();
    }, [props.subaccountId]);

    return (
        <div className="h-[900px] overflow-scroll p-4">
            <MediaComponent data={data} subaccountId={props.subaccountId} />
        </div>
    );
};

export default MediaBucketTab;
