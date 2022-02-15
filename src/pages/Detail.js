import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
  return (
    <>
      <Box
        sx={{
          width: 42,
          height: 35,
          m: "auto", //11111111111111
          textAlign: "center", //22222222222222
          pt: 1,
          backgroundColor: "#f1f1f5",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        뷰티
      </Box>
      <br />
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "500", m: "auto", textAlign: "center" }} //3333333333333333
      >
        마음을 다독이는 힐링 테라피
      </Typography>
      <br />
      <Typography
        variant="h6"
        component="div"
        sx={{ m: "auto", textAlign: "center" }} //444444444444444444444
      >
        HWIYAYA 휘야야
      </Typography>
      <br />
      <Box sx={{ display: "flex", flexDirection: "low" }}>
        <Box sx={{ m: 10 }}>
          <img src="https://tumblbug-pci.imgix.net/1707fb6cb8ce42a8cc0e976994c65e4c14b54019/d7a43f48957f84a5a8c7c6a1cee7c3587c7b607b/dde94b6cb146081ca58d3aab56cf1adbb9847b57/f68dc68d-d379-462a-bd4f-76a171497778.jpeg?ixlib=rb-1.1.0&w=620&h=465&auto=format%2Ccompress&lossless=true&fit=crop&s=ee5f92bbb7c150207032120aed20fa4f" />
        </Box>
        <Box
          component="div"
          sx={{ display: "flex", flexDirection: "column", mt: 10 }}
        >
          <Card sx={{ minWidth: 275, width: 360 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                모인금액
              </Typography>
              <Typography variant="h4" component="div">
                535,000원
                <Typography variant="h6" component="span">
                  107%
                </Typography>
              </Typography>
              <br />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                남은시간
              </Typography>
              <Typography variant="h4" component="div">
                23
                <Typography variant="h6" component="span">
                  일
                </Typography>
              </Typography>
              <br />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                후원자
              </Typography>
              <Typography variant="h4" component="div">
                14
                <Typography variant="h6" component="span">
                  명
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275, width: 360, mt: 5, bgcolor: "#f1f1f5" }}>
            <CardContent>
              <Typography
                sx={{ mb: 1.5, fontWeight: "bold" }}
                color="text.first"
              >
                펀드진행중
              </Typography>
              <Typography variant="body2">
                목표 금액인 100,000,000원이 모여야만 결제됩니다
                <br />
                결제는 2022년 2월 25일에 다함께 진행됩니다
              </Typography>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 5, py: 3, fontSize: 20 }}
          >
            이 프로젝트 후원하기
          </Button>
        </Box>
      </Box>
    </>
  );
}
