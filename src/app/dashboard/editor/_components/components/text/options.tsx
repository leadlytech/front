"use client";

import { ComponentItem } from "@/interfaces";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from 'react';

const schema = z.object({});

type Props = {
  getter: z.infer<typeof schema>;
  setter: (data: z.infer<typeof schema>) => void;
};

export function Options({ getter, setter }: Props) {
  const [value, setValue] = useState("");
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
