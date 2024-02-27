type Parent = HTMLElement | EventTarget | null
type Child = HTMLElement  | null

const useDescendent = (parent:Parent, child:Child) => {
    let node = child?.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

export default useDescendent