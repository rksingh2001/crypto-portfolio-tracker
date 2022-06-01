import React from 'react';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';

const NewsCard = ({ news }) => {
  return (
    //   <Card style={{ backgroundColor: "pink", width: "100%" }} variant="outlined">
    //     <CardActionArea style={{ width: "100%" }}>
    //       <CardHeader
    //         title={news.name}
    //       />
    //       <CardContent>
    //         <Typography color="gray">{news.description}</Typography>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>
    <Card>
      <CardActionArea>
        <CardHeader title={<Typography>{news.name}</Typography>} />
      </CardActionArea>
    </Card>
  )
}

export default NewsCard;