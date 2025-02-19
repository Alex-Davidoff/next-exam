import MenuComponent from "@/components/MenuComponent/MenuComponent";

const MainPage = async () => {
    return(
        <div>
            <MenuComponent/>
            <h2 className="mt-4 text-center text-xl italic">Сайт на якому знаходиться акумульована інформація з dummyjson.com про користувачів та рецепти.</h2>
        </div>
    )
}

export default MainPage;