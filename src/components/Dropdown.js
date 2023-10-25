import React from 'react';
import { 
  Dropdown as BootstrapDropdown,
  DropdownButton,
 } from 'react-bootstrap';

/** @param {{ title: string, items: { children?: React.ReactNode, href?: string, onClick?: () => any }[] }} props */
function Dropdown(props) {
  const {
    title,
    items,
    ...otherProps
  } = props;

  return (
    <DropdownButton title={title} {...otherProps}>
      {
        items.map(item => {
          const {
            children,
            ...otherProps
          } = item;

          return (
            <BootstrapDropdown.Item {...otherProps}>
              {children}
            </BootstrapDropdown.Item>
          );
        })
      }
    </DropdownButton>
  )
}

export default Dropdown;