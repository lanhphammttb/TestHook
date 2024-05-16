import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, styled } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TreeNode {
  id: number;
  value: string;
  children?: TreeNode[];
}

const tree: any = [
  {
    id: 1,
    value: 'Điện thoại',
    children: [
      {
        id: 2,
        value: 'Điện thoại di dộng',
        children: [
          {
            id: 3,
            value: 'Điện thoại hãng',
            children: [
              {
                id: 4,
                value: 'Samsung',
                children: []
              },
              {
                id: 5,
                value: 'Iphone',
                children: []
              }
            ]
          },
          {
            id: 6,
            value: 'Điện thoại phím',
            children: []
          }
        ]
      },
      {
        id: 7,
        value: 'Điện thoại bàn',
        children: []
      }
    ]
  },
  {
    id: 8,
    value: 'Máy tính',
    children: [
      {
        id: 9,
        value: 'Laptop',
        children: []
      },
      {
        id: 10,
        value: 'PC',
        children: [
          {
            id: 11,
            value: 'PC nhỏ',
            children: []
          },
          {
            id: 12,
            value: 'PC to',
            children: []
          }
        ]
      }
    ]
  }
];

const Tree = () => {
  const [openNodes, setOpenNodes] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    if (openNodes.includes(value)) {
      setOpenNodes(openNodes.filter((node) => node !== value));
    } else {
      setOpenNodes([...openNodes, value]);
    }
  };

  const renderTree = (nodes: TreeNode[]) => {
    return (
      <List disablePadding>
        {nodes.map((node: any, index) => {
          const isOpen = openNodes.includes(node.id);

          return (
            <React.Fragment key={index}>
              <ListItem
                onClick={() => handleToggle(node.id)}
                style={{
                  paddingLeft: 16 + 20 * node.level,
                  background: '#F6F6F6',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                <ListItemText
                  primary={node.value}
                  primaryTypographyProps={{
                    fontSize: `20`,
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    color: '#000000'
                  }}
                />
                {node.children &&
                  node.children.length > 0 &&
                  (isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItem>
              {node.children && node.children.length > 0 && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {renderTree(node.children)}
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    );
  };

  const addLevelToNodes = (nodes: any, level: number) => {
    return nodes.map((node: any) => ({
      ...node,
      level,
      children: node.children ? addLevelToNodes(node.children, level + 1) : []
    }));
  };

  const treeWithLevels = addLevelToNodes(tree, 0);

  return <div className="w-1/5 p-5">{renderTree(treeWithLevels)}</div>;
};

export default Tree;
