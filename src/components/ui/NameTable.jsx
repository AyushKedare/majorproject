// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';

// export default function NameTable() {
//   const items = [
//     { avatar: '/static/images/avatar/1.jpg', primary: 'Harshey Kaur', secondary: 'Attention: 93%' },
//     { avatar: '/static/images/avatar/2.jpg', primary: 'Rajas Baadkar', secondary: 'Attention: 96%' },
//     { avatar: '/static/images/avatar/3.jpg', primary: 'Ayush Kedare', secondary: 'Attention: 82%' },
//     { avatar: '/static/images/avatar/4.jpg', primary: 'Kabir Mehra', secondary: 'Attention: 54%' },
//     { avatar: '/static/images/avatar/2.jpg', primary: 'Rishabh Malik', secondary: 'Attention: 86%' },
//     { avatar: '/static/images/avatar/3.jpg', primary: 'Shruti Patil', secondary: 'Attention: 88%' },
//     { avatar: '/static/images/avatar/4.jpg', primary: 'Alia Gupta', secondary: 'Attention: 55%' },
//   ];

//   return (
//     <div style={{ width: '200px',height:'500px',position:'fixed',right: '0'}}>
//     <List sx={{ width: '100%', maxWidth: 350, bgcolor: '#e1f5fe', borderTopLeftRadius: '12px',borderBottomLeftRadius: '12px',height:'100%' }}>
//       {items.map((item, index) => (
//         <ListItem key={index} disablePadding sx={{ '&:hover': { backgroundColor: '#f5f5f5' }}}>
//           <ListItemAvatar>
//             <Avatar alt={`Avatar n°${index + 1}`} src={item.avatar} />
//           </ListItemAvatar>
//           <ListItemText primary={item.primary} secondary={item.secondary} />
//         </ListItem>
//       ))}
//     </List>
//     </div>
//   );
// }


import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const NameTable = () => {
  const items = [
    { avatar: '/static/images/avatar/1.jpg', primary: 'Harshey Kaur', secondary: 'Attention: 93%' },
    { avatar: '/static/images/avatar/2.jpg', primary: 'Rajas Baadkar', secondary: 'Attention: 96%' },
    { avatar: '/static/images/avatar/3.jpg', primary: 'Ayush Kedare', secondary: 'Attention: 82%' },
    { avatar: '/static/images/avatar/4.jpg', primary: 'Kabir Mehra', secondary: 'Attention: 54%' },
    { avatar: '/static/images/avatar/2.jpg', primary: 'Rishabh Malik', secondary: 'Attention: 86%' },
    { avatar: '/static/images/avatar/3.jpg', primary: 'Shruti Patil', secondary: 'Attention: 88%' },
    { avatar: '/static/images/avatar/4.jpg', primary: 'Alia Gupta', secondary: 'Attention: 55%' },
    { avatar: '/static/images/avatar/4.jpg', primary: 'Kabir Mehra', secondary: 'Attention: 54%' },
    { avatar: '/static/images/avatar/2.jpg', primary: 'Rishabh Malik', secondary: 'Attention: 86%' },
    { avatar: '/static/images/avatar/3.jpg', primary: 'Shruti Patil', secondary: 'Attention: 88%' },
    { avatar: '/static/images/avatar/4.jpg', primary: 'Alia Gupta', secondary: 'Attention: 55%' },
    { avatar: '/static/images/avatar/4.jpg', primary: 'Kabir Mehra', secondary: 'Attention: 54%' },
    
  ];

  return (
    <div style={{ width: '200px', height: '600px', position: 'fixed', right: '0',top:'0' ,overflowY: 'auto' }}>
      <List sx={{ width: '100%', maxWidth: 350, bgcolor: '#e1f5fe', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ '&:hover': { backgroundColor: '#f5f5f5' }}}>
            <ListItemAvatar>
              <Avatar alt={`Avatar n°${index + 1}`} src={item.avatar} />
            </ListItemAvatar>
            <ListItemText primary={item.primary} secondary={item.secondary} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default NameTable;
