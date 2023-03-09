import MainHeader from "./main-header";

export default function Layout(props: { children: React.ReactNode }){
    return (
        <>
            <MainHeader />
            <main>
                {props.children}
            </main>
        </>
    )
}