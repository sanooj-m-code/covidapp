import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = React.useState([]);

  const load = async () => {
    return await axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((response) => setData(response.data));
  };

  const totalConfirmed = React.useCallback((value) => {
    let districtDatas = data[value];
    let districtData = districtDatas["districtData"];
    let districtVals = Object.values(districtData);
    let totalActive = districtVals
      .map((item) => item.confirmed)
      .reduce((prev, next) => prev + next);
    return totalActive;
  });

  const totalRecovered = React.useCallback((value) => {
    let districtDatas = data[value];
    let districtData = districtDatas["districtData"];
    let districtVals = Object.values(districtData);
    let totalActive = districtVals
      .map((item) => item.recovered)
      .reduce((prev, next) => prev + next);
    return totalActive;
  });

  const totalDeseased = React.useCallback((value) => {
    let districtDatas = data[value];
    let districtData = districtDatas["districtData"];
    let districtVals = Object.values(districtData);
    let totalActive = districtVals
      .map((item) => item.deceased)
      .reduce((prev, next) => prev + next);
    return totalActive;
  });

  const handleDistrictShow = (e,value) => {
      navigate(`/district=${value}`)
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: { xs: 1, md: 3, lg: 3, xl: 4 } }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "flex" },
            mb: { xs: 1, md: 2, sm: 2, lg: 3 },
            fontWeight: "bold",
            borderBottom: "1px solid #13a872",
            color: "#272727",
          }}
        >
          States
        </Typography>
        <Stack spacing={1}>
          {Object.keys(data).map((value) => (
            <Item key={"grid" + value} xs={4} sm={4} md={2} lg={2}>
              <Button onClick={(e)=>handleDistrictShow(e,value)}>{value}</Button>
              <br />
              Confirmed : {totalConfirmed(value)}
              <br />
              Recovered : {totalRecovered(value)}
              <br />
              Deceased : {totalDeseased(value)}
            </Item>
          ))}
        </Stack>
      </Container>
    </React.Fragment>
  );
}
