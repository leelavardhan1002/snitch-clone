import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  IconButton,
  styled,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";

// Styled components
const StyledFooter = styled(Box)({
  backgroundColor: "white",
  paddingTop: "64px",
  paddingBottom: "24px",
});

const FooterTitle = styled(Typography)({
  fontSize: "12px",
  fontWeight: 500,
  marginBottom: "20px",
  letterSpacing: "1px",
});

const FooterLink = styled(Link)({
  color: "#000",
  fontSize: "13px",
  textDecoration: "none",
  marginBottom: "8px",
  display: "block",
  "&:hover": {
    textDecoration: "underline",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 14px",
  },
});

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Offline Store Section */}
          <Grid item xs={12} sm={3}>
            <FooterTitle>OFFLINE STORE</FooterTitle>
            <FooterLink href="/stores" underline="none">
              Find Stores Near Me
            </FooterLink>
          </Grid>

          {/* Get To Know Us Section */}
          <Grid item xs={12} sm={3}>
            <FooterTitle>GET TO KNOW US</FooterTitle>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/faq">FAQ's</FooterLink>
            <FooterLink href="/blogs">Blogs</FooterLink>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
          </Grid>

          {/* Track/Return Section */}
          <Grid item xs={12} sm={3}>
            <FooterTitle>TRACK OR RETURN/EXCHANGE ORDER</FooterTitle>
            <FooterLink href="/track">TRACK ORDER</FooterLink>
            <FooterLink href="/return">
              PLACE RETURN/EXCHANGE REQUEST
            </FooterLink>
            <FooterLink href="/policy">RETURNS/EXCHANGE POLICY</FooterLink>
          </Grid>

          {/* Customer Care Section */}
          <Grid item xs={12} sm={3}>
            <FooterTitle>CUSTOMER CARE</FooterTitle>
            <Typography variant="body2" sx={{ mb: 1, fontSize: "13px" }}>
              Timings: 10 AM - 7 PM (Mon - Sat)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: "13px" }}>
              Whatsapp :{" "}
              <Link href="tel:+910123456789" sx={{ color: "inherit" }}>
                +91 0123456789
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: "13px" }}>
              Instagram:{" "}
              <Link
                href="https://instagram.com"
                sx={{ color: "inherit" }}
              >
                @snitch.co.in
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {/* Newsletter Section */}
        <Box sx={{ my: 6 }}>
          <FooterTitle align="center">SIGN UP AND SAVE</FooterTitle>
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, fontSize: "13px" }}
          >
            Sign up now and be the first to know about exclusive offers, latest
            fashion trends & style tips!
          </Typography>
          <Box sx={{ maxWidth: "400px", mx: "auto" }}>
            <StyledTextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: "black" }}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Social Media Links */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          {[
            InstagramIcon,
            FacebookIcon,
            YouTubeIcon,
            TwitterIcon,
            PinterestIcon,
            LinkedInIcon,
          ].map((Icon, index) => (
            <IconButton key={index} sx={{ color: "black" }}>
              <Icon />
            </IconButton>
          ))}
        </Box>

        {/* Copyright */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <span>© 2024 Leelavardhan Boddapalli. All Rights Reserved.</span>
            <span>
              Made in India, for the World{" "}
              <PublicIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </span>
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
