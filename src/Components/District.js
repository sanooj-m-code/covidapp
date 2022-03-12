import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function District() {
  const params = useParams();
  const inputRef = React.useRef();
  const state = params.district;

  const [data, setData] = React.useState([]);
  const [dataCopy, setDataCopy] = React.useState([]);

  const load = async (search = null) => {
    return await axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((response) => {
        let dataStore = response.data[state]["districtData"];

        if (!search) setData(response.data[state]["districtData"]);
        else {
          let filterdData = Object.keys(dataStore)
            .filter(function (el) {
              return el.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            })
            .reduce((cur, key) => {
              return Object.assign(cur, { [key]: dataStore[key] });
            }, {});
          setData(filterdData);
        }
      });
  };

  const handleSearch = () => {
    load(inputRef.current.value);
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: { xs: 1, md: 3, lg: 3, xl: 4 } }}>
        <Grid container>
          <Grid item xs={6}>
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
              Districts
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              fullWidth
              inputRef={inputRef}
              sx={{ background: "#fff" }}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Grid>
        </Grid>

        <Stack spacing={1}>
          {Object.keys(data).map((value) => (
            <Item key={"grid" + value} xs={4} sm={4} md={2} lg={2}>
              <Button>{value}</Button>
              <br />
              Confirmed : {data[value].confirmed}
              <br />
              Recovered : {data[value].recovered}
              <br />
              Deceased : {data[value].deceased}
            </Item>
          ))}
        </Stack>
      </Container>
    </React.Fragment>
  );
}
