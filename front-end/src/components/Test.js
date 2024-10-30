import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from '../Theme';

function Test() {
    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.black.main, color: '#fff' }}>Black</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.gray.main, color: '#000' }}>Gray</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.srth.main, color: '#fff' }}>เสรีรวมไทย</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.cpk.main, color: '#000' }}>ชาติพัฒนากล้า</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.pthrpl.main, color: '#fff' }}>เพื่อไทยรวมพลัง</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.thsth.main, color: '#fff' }}>ไทยสร้างไทย</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.pcc.main, color: '#fff' }}>ประชาชาติ</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.cthptn.main, color: '#fff' }}>ชาติไทยพัฒนา</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.pctp.main, color: '#fff' }}>ประชาธิปัตย์</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.rthsc.main, color: '#fff' }}>รวมไทยสร้างชาติ</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.plpcr.main, color: '#fff' }}>พลังประชารัฐ</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.pcth.main, color: '#fff' }}>ภูมิใจไทย</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.pth.main, color: '#fff' }}>เพื่อไทย</Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.gg.main, color: '#fff' }}>GG</Button>
        </ThemeProvider>  
    );
}

export default Test;