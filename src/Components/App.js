import React, { Component } from 'react';
import Topbar from './Topbar';
import FooterMenu from './FooterMenu';
import Content from './Content';
import Sidebar from './Sidebar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0,
      windowHeight: 0,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    document.body.style.margin = 0;
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    let windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    this.setState({
      windowWidth,
      windowHeight,
    });
  }

  render() {
    const { windowWidth } = this.state;

    const sidebarCollapsed = windowWidth < 1100;

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarCollapsed,
      sidebarWidth: sidebarCollapsed ? 50 : 150,
    };

    const menuItems = [
      { icon: '🐉', text: 'Item 1' },
      { icon: '🐨', text: 'Item 2' },
      { icon: '🦏', text: 'Item 3' },
      { icon: '🐿️', text: 'Item 4' },
      { icon: '🐅', text: 'Item 5' },
    ];

    if (styles.showSidebar) {
      menuItems.push({ icon: `😺️`, text: 'Profile' });
      menuItems.push({ icon: `⚙`, text: 'Settings' });
    }

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        {styles.showSidebar ? (
          <Sidebar menuItems={menuItems} styles={styles} />
        ) : (
          <Topbar styles={styles} />
        )}
        <Content styles={styles} />
        {!styles.showSidebar && (
          <FooterMenu menuItems={menuItems} styles={styles} />
        )}
      </div>
    );
  }
}

export default App;
