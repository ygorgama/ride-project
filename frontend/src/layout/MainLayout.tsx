import { Outlet } from "react-router";

export default function MainLayout(){
    return (
        <main >
            <Outlet />
        </main>
    );
}