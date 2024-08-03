import { Box, Typography , } from "@mui/material";
// import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";


const StatBox = ({ title, subtitle, icon, progress, increase , textColor}) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" height={"120px"} m="-6px 30px ">
      <Box display="flex" justifyContent="space-between">
        <Box sx={{marginTop:"5px", width:"170px" ,height:"50px", }}>
         {/* <Typography sx={{  fontSize: "24px"}}>  {icon}</Typography> */}
          <Typography
            variant="h4"
            // fontWeight="bold"
            sx={{ color: 'black' , my:"10px" , marginLeft:"10px" }}
          >
            {title}
          </Typography>
        </Box>
         <Box sx={{marginTop:"20px" , marginRight:"8px"}} >
          {/* {console.log(textColor)} */}
         <ProgressCircle progress={progress} textColor={textColor} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography variant="h3" sx={{ color: "black", mt:"-20px", height:"50px",width:"40px",marginLeft:"10px",fontWeight: " Bold" ,    }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color:"black", marginRight:"20px" }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
