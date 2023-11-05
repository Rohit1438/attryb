import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo1 from "../Images/logo/buycar.png";
import { NavLink, Link } from "react-router-dom";

const links = [
  { path: "/", title: "OEM" },
  { path: "/admin", title: "Admin" },
  // { path: "/watchlist", title: "Saved" }
  
];

const links2 = [
  { path: "/", title: "Home" },
  { path: "/admin", title: "Admin" },
  { path: "/login", title: "Signup / Register" }

  
  
]



const defaultLinkStyle = {
  textDecoration: "none",
  color: "#ffd58c",
  fontSize: "20px",
  letterSpacing: "1px",
  fontWeight:"800"
};
const activeLinkStyle = {
  width: "80px",
  textDecoration: "none",
  color: "white",
  borderBottom: "4px solid gray",
  borderRadius: "10px",
  paddingBottom: "3px",
  fontSize: "20px",
  fontWeight: "bold",
  letterSpacing: "1px",
  margin: "auto"
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      style={{
        zIndex: 10,
        position: "sticky",
        width: "100%",
        top: "0px",
        borderBottom: "1px solid white",
        
        background:"#171819"
      }}
    >
      <Box bg={useColorModeValue("transparent")} background={"#2f235b"} color={"#ffca6f"} px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={10} padding={"20px opx 20px"}  alignItems={"center"}>
            <Link to={"/"}>
           

            <Box w="180px" h="100px" ml={10} padding="5px">
          <img src={logo1} alt="Logo" style={{ maxHeight: "90%", height: "auto" }} />
        </Box>
            {/* <Box w={"180px"} h={"100px"} ml={10} padding={"5px"}>
             <h1 style={{color:"white",fontSize:"35px",fontWeight:"800"}}>🚗Buy</h1>
             <img  src={logo1} alt="" />
            </Box> */}
            </Link>
            <HStack
              as={"nav"}
              spacing={12}
              display={{ base: "none", md: "flex" }}
            >
              {links.map(({path, title}) => (
                <NavLink style={({ isActive }) => {
                  return isActive ? activeLinkStyle : defaultLinkStyle;
                }} key={path} to={path}>
                  {title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} mr={3}>
            <Menu>
              <MenuButton
                as={Button}
                border={"3px solid white"}
                p={1}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                _hover={{
                  border: "3px solid #ffca6f",
                }}
                minW={0}
              >
                <div>
                  <Avatar
                    size={"md"}
                    src={
                      "https://www.vecteezy.com/vector-art/9734564-default-avatar-profile-icon-of-social-media-user"
                    }
                  />
                </div>
              </MenuButton>
              <MenuList bg={"blackAlpha.800"}>
             
                <Link to={"/login"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"90px"} color={"white"}>Login</MenuItem></Link>
                <MenuDivider />
                <Link to={"/admin"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"88px"} color={"white"}>Profile</MenuItem></Link>
              

              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} paddingTop={"20px"} marginTop={"20px"} borderTop={"1px solid #ffca6fc3"}>
            <Stack as={"nav"} spacing={4}>
              {links2.map(({path, title}) => (
                <NavLink key={path} to={path}>{title}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default Navbar;
