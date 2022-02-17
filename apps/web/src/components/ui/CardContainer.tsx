import React, { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

type CardContainerProps = {
  children: ReactNode;
  headerText?: string;
};

export const CardContainer = ({ children, headerText }: CardContainerProps) => {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardHeader title={headerText} />
      <CardContent>
        {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography> */}
        {children}
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="edit">
          <FavoriteIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};
