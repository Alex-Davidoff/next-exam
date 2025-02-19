interface IArrStrProps {
    arrstr: string[];
}

export const RecipeArrayStringsComponent = ({arrstr}: IArrStrProps) => {
    if (arrstr) {
    return(
        <ul className="flex gap-x-4 flex-wrap">
            {arrstr.map((str, index) => (
                <li key={index}>{str}</li>
            ))}
        </ul>
    )}
}