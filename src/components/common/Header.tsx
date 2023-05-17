const Header = () => {
  const headerStyle: React.CSSProperties = {
    padding: '20px 0',
    lineHeight: '1.5em',
  };
  const titleStyle: React.CSSProperties = {
    fontSize: '6rem',
    fontWeight: '600',
    marginBottom: '2rem',
    lineHeight: '1em',
    color: '#ececec',
    textAlign: 'center',
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Todos</h1>
    </header>
  );
};

export default Header;
