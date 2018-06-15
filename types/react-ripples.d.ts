declare module "react-ripples" {
    import { Component, Props } from "react";

    export interface RippleProps{
        color: string;
        during: number;
    }

    export default function (props: any): React.Component
}