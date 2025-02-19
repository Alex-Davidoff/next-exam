import Link from "next/link";

interface ITagsProps {
    tags: string[];
}

export const RecipeTagsComponent = ({tags}: ITagsProps) => {
    if (tags) {
    return(
        <ul className="flex gap-4">
            {tags.map((tag, index) => (
                <li key={index} className="underline">
                <Link href={`/auth/recipes?tag=${tag}`}>#{tag}</Link>  
                </li>
            ))}
        </ul>
    )}
}