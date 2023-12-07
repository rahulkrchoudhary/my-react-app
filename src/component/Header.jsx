import React from 'react';
import { Box, Button, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import headerImg from '../assets/Webdev.png';

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    backgroundColor: '#0a58ca',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: '1',
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      flex: '2',
      textAlign: 'center',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  return (
    <CustomBox component="header">
      <BoxText component="section">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Hi I Am Rahul Kumar Choudhary
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: '#fff',
          }}
        >
          Full-Stack Developer with expertise in React, GraphQL, and Node.js
        </Typography>

        <Box>
          <NavLink className="nav-link" activeClassName="active" to="/report">
            <Button
              variant="contained"
              sx={{
                mr: 2,
                px: 4,
                py: 1,
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                borderRadius: 0,
                borderColor: '#14192d',
                color: '#fff',
                backgroundColor: '#14192d',
                '&&:hover': {
                  backgroundColor: '#343a55',
                },
                '&&:focus': {
                  backgroundColor: '#343a55',
                },
              }}
            >
              Create Task
            </Button>
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/report">
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                borderRadius: 0,
                color: '#fff',
                backgroundColor: 'transparent',
                borderColor: '#fff',
                '&&:hover': {
                  color: '#343a55',
                  borderColor: '#343a55',
                },
                '&&:focus': {
                  color: '#343a55',
                  borderColor: '#343a55',
                },
              }}
            >
              My Tasks
            </Button>
          </NavLink>
        </Box>
      </BoxText>

      <Box
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            flex: '1',
            paddingTop: '30px',
            alignSelf: 'center',
          },
          [theme.breakpoints.up('md')]: {
            flex: '2',
            alignSelf: 'flex-end',
          },
        })}
      >
        <img
          src={headerImg}
          alt="headerImg"
          style={{
            width: "60%",
            marginBottom: 10,
            alignSelf: 'flex-end', // Move the image to the right
          }}
        />
      </Box>
    </CustomBox>
  );
};

export default Header;
