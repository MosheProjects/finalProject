import React, { useState ,useEffect} from 'react'
import { useFirestore } from '../Context/FireStoreContext';
import { AppBar, Tab, Tabs, Typography, Box, Container } from '@mui/material';
import './AdminsControllPage.css';

export default function AdminsControllPage() {

  const { addFsForum, getDataFsForum } = useFirestore();
const [forumData,setForumData]=useState();
const [selectedTab, setSelectedTab] = useState(0);

const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};


  useEffect(() => {
    getDataFsForum("forumMessages").then((data) => {
      setForumData(data);
    });
  }, []);


  const tabContents = [
    <div>
      <h2>User Management</h2>
      {/* Add user management functionality here */}
    </div>,
    <div>
      <h2>Chat Management</h2>
      {/* Add chat management functionality here */}
    </div>,
    <div>
      <h2>Content Management</h2>
      {/* Add content management functionality here */}
    </div>,
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Admin Control Panel
      </Typography>
      <Box sx={{ width: '100%' }}>
        <AppBar position="static">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="User Management" />
            <Tab label="Chat Management" />
            <Tab label="Content Management" />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          {tabContents[0]}
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          {tabContents[1]}
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          {tabContents[2]}
        </TabPanel>
      </Box>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

