import dynamic from "next/dynamic";

export function RemoveSSRFromComponent(component) {
    return dynamic(() => Promise.resolve(component), {ssr: false});
}
