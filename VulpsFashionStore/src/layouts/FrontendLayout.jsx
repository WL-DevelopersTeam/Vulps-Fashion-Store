import Navigation from "../components/Navigation";

export default function FrontendLayout({ children }) {
    return (
        <>
            <Navigation />
            <main>{children}</main>
        </>
    );
}
