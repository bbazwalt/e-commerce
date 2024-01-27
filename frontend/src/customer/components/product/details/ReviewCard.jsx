import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#1976D2" }}
            >
              B
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Ben</p>
              <p className="opacity-70">Jan 16, 2024</p>
            </div>
          </div>
          <Rating value={4.5} name="half-rating" readOnly precision={0.5} />
          <p>Great product. I love this phone.</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewCard;
