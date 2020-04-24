import Link from 'next/link';

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div className='menuStyle'>
        <Link href='/'>
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href='/about'>
            <a style={linkStyle}>About</a>
        </Link>
        <Link href='/hooks'>
            <a style={linkStyle}>Hooks</a>
        </Link>
        {/* <Link href='/hooksAsFunction'>
            <a style={linkStyle}>Hooks as function</a>
        </Link> */}
    </div>
)

export default Header;