
export function copyHandle(text: string){
    navigator.clipboard.writeText(text);
    alert('copy to keyboard')
}