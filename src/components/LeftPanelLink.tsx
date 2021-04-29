import {Link, useLocation} from "react-router-dom";

const LeftPanelLink = (p: { href: string, icon: string, text: string }) => {
    const path = useLocation();
    console.log(path.pathname);
    const parts = p.href.split('/')
    const isActive = path.pathname.includes(parts[parts.length - 1]) || (p.text.toLowerCase() === 'products' && path.pathname === '/admin');

    return (
        <Link to={p.href} className={isActive
            ? 'list-group-item list-group-item-action d-flex align-bottom active'
            : 'list-group-item list-group-item-action d-flex align-bottom'}>
            <span className={"material-icons mr-1"}>{p.icon} </span>
            <span className={"d-none d-md-inline"}> {p.text}</span>
        </Link>
    );
}

export default LeftPanelLink;