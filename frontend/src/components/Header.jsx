export default function Header() {
    return (
        <header className="header">
            <h1>Toot Toot</h1>
            {/* <img src="logo.png" alt="Company Logo" className="logo" /> */}
            <nav className="navHeaders">
                <ul className="ul">
                    <li className="li"><a href="/">Home</a></li>
                    <li className="li"><a href="/about">About</a></li>
                    <li className="li"><a href="/services">Services</a></li>
                    <li className="li"><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
