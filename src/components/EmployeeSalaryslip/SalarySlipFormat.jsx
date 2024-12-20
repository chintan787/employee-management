import React, { useRef, useState, useEffect, useCallback } from 'react'
import { PDFExport } from "@progress/kendo-react-pdf";
import { useSelector, useDispatch } from "react-redux";
import { genrateSalarySlip } from '../../Action/Admin';
import {
    Grid,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    TextField, Switch, styled
} from "@mui/material";

import { styles } from "./EmployeeSalarySlip.style";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Editor,
    EditorTools,
    EditorUtils,
    ProseMirror,
    EditorMountEvent,
} from "@progress/kendo-react-editor";
import ReactHtmlParser from "react-html-parser";
import ImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { QrCodeScannerOutlined } from '@mui/icons-material';
// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import '@progress/kendo-theme-default/dist/all.css'; 


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));









export default function SalarySlipFormat({ empInfo, setEmpInfo, isDownloadClick, setIsDownloadClick, signatureImg, setSignatureImg, signatureContent, imageWidth, setImageWidth, value, setShowEmailLoader, setShowMessageBox, downloadPdf, setDownloadPdf, sendEmail, setSendEmail, emailData, address, setAddress, enableSecurityHold, setEnableSecurityHold }) {


    const [checked, setChecked] = React.useState(true);
    const currentTime = new Date();
    const currmonth = currentTime.toLocaleString("default", { month: "long" });
    const curryear = currentTime.getFullYear();
    const [saveAsPDF, setSaveAsPDF] = useState(); //export pdf
    const { EditorState, EditorView } = ProseMirror;
    const { imageResizing } = EditorUtils;
    const navigate = useNavigate();
    const pdfExportComponent = React.useRef(null);
    // let pdfExportComponent
    const maxNumber = 69;
    const dispatch = useDispatch();
    const salarySlip = useSelector((state) => state.generateSalarySlipReducer?.salarySlip);
    const totalDeduction =
        empInfo.provident_fund +
        empInfo.esi +
        empInfo.loan +
        empInfo.profession_tax
    const [salaryDescription, setSalaryDescription] = useState({
        basic: 0,
        HRA: 0, uniform: 0, travel: 0, gross_salary: 0
    })

    const handleChange = (event) => {
        setEnableSecurityHold(event.target.checked);
        if (event.target.checked === false) {
            setEmpInfo({ ...empInfo, security_hold: 0 })
        }
    };


    let fullname, designation, salary, netsalary;
    useEffect(() => {
        if (value !== null) {

            fullname = value.emp_first_name + " " + value.emp_last_name;
            salary = value.emp_basic_salary;
            designation = value.emp_designation;
            setEmpInfo({
                ...empInfo,
                emp_fullname: fullname,
                emp_code: value.emp_code,
                emp_designation: designation,
                salary: salary,
                totalWorkDays: empInfo.totalWorkDays,
                calculation: salary,
                leave: 0,
                otherEarnings: 0,
                bonus: 0,
                paidLeaves: 0,
            });
        }
    }, [value]);

    const calculateNetSalary = () => {
        if (empInfo.gross_salary !== 0) {
            netsalary = empInfo.gross_salary - totalDeduction;
            setEmpInfo({
                ...empInfo,
                net_salary: netsalary,
            });
        }

    };

    const calCulateSalaryDescription = (result) => {
        const basic = result * 0.5
        const HRA = basic * 0.5;
        const uniform = basic * 0.3;
        const travel = basic * 0.2;
        setSalaryDescription({
            basic: basic,
            HRA: HRA,
            uniform: uniform,
            travel: travel,
            // basic: Math.round(basic),
            // HRA: Math.round(HRA),
            // uniform: Math.round(uniform),
            // travel: Math.round(travel),
        })


    }

    const countSalaryBasedLeave = () => {
        const finalSalary = empInfo.salary;
        const perDaySalary = finalSalary / empInfo.totalWorkDays
        const countworkingDays = empInfo.totalWorkDays - empInfo.leave;
        const result = perDaySalary * countworkingDays;
        let finalRes = result - empInfo?.security_hold;
        setEmpInfo({
            ...empInfo,
            calculation: Math.round(finalRes),
        });
        calCulateSalaryDescription(Math.round(finalRes));
    }

    useEffect(() => {
        calculateNetSalary();
    }, [empInfo.gross_salary, totalDeduction]);

    useEffect(() => {
        countSalaryBasedLeave();
    }, [empInfo.leave, empInfo.totalWorkDays, empInfo.salary, empInfo.security_hold])


    const handleAddress = (e) => {
        const { name, value } = e.target;
        setAddress(value);
    };

    const handleEmployeeData = (e) => {
        const { name, value } = e.target;
        setEmpInfo({
            ...empInfo,
            [name]: value,
        });

    };

    const handleDeduction = (e) => {
        const { name, value } = e.target;
        setEmpInfo({ ...empInfo, [name]: Number(value) });
    };

    const calculateGrossSalary = () => {
        const test = salaryDescription.basic + salaryDescription.HRA + salaryDescription.uniform + salaryDescription.travel + empInfo.bonus + empInfo.otherEarnings + empInfo.paidLeaves
        const gross_salary_cal = test
        setEmpInfo({ ...empInfo, gross_salary: gross_salary_cal, calculation: test })
    }
    useEffect(() => {
        calculateGrossSalary();
    }, [salaryDescription.basic, empInfo.bonus, empInfo.otherEarnings, empInfo.paidLeaves, empInfo.security_hold])

    const handleSignature = (e) => {
        if (e.viewProps) {
            const { plugins, doc } = e.viewProps.state;

            return new EditorView(
                { mount: e.dom },
                {
                    ...e.viewProps,
                    state: EditorState.create({
                        doc,
                        plugins: [...plugins, imageResizing()],
                    }),
                }
            );
        } else {
            const file = e[0].data_url;
            setSignatureImg(file);
        }
    };

    const handleSignatureDimension = (e) => {
        setImageWidth(e.html);
    };


    let fileName;
    if (empInfo.emp_fullname) {
        fileName = `${empInfo.emp_fullname.split(" ")[0]}-salary-slip-${empInfo.month}-${empInfo.year}.pdf`
    }
    var content = "";
    const exportPDFWithComponent = () => {
        setTimeout(() => {
            if (value !== null) {
                setShowEmailLoader(true);

                if (pdfExportComponent.current) {
                    let gridElement = document.getElementById("pdfFile");
                    let pdfData;
                    drawDOM(gridElement, {
                        paperSize: "A4",
                        scale: 0.8,
                        margin: "1cm"
                    })
                        .then((group) => {
                            return exportPDF(group);
                        })
                        .then((dataUri) => {
                            pdfData = dataUri.split(";base64,")[1];
                            setSaveAsPDF(dataUri.split(";base64,")[1]);
                            content += "<html><body>";
                            content += "<table width='100%' style='border-spacing: inherit;padding:0;'><tr><td style='padding:0;'>"; // Outer table
                            content += "<table width='100%'style='border-spacing: inherit;padding:0;'><tr><td style='padding:0;'>"; // Outer table
                            content += "<table width='60%' style='border-spacing: inherit;padding:0;'>"; // Nested table
                            content += `<tr><td width='100%' style='padding-bottom:10px;'>${emailData?.greetings}</td><td></td></tr>`;
                            content += "<tr><td width='100%'><td><td></td></tr>";
                            content += `<tr><td width='100%' style='padding-bottom:10px;'>${emailData?.message}</td></tr>`;
                            content += "<tr><td width='100%'><td><td></td></tr>";
                            content += "<tr><td width='100%'>Best Regards,</td><td></td></tr>";
                            content += "<tr><td width='100%'><b>Chintan Patel</b></td><td></td></tr>";
                            content += "<tr><td width='100%'><i>From Stroke Infotech</i></td><td></td></tr>";
                            content += "<tr><td width='100%'><b><font color='#666666'>A MERN and MEAN Stack Development Company</font></b></td><td></td></tr>";
                            content += "<tr><td width='100%' style='padding:10px 0;' ><img src='https://i.ibb.co/DQpMh5J/Stroke-Infotech-logo.png' alt='Stroke-Infotech-logo'  /></td><td></td></tr>";
                            content += "<tr><td width='100%'><b>Email: <a href='mailto:info@strokeinfotech.com'>info@strokeinfotech.com</a></b></td><td></td></tr>";
                            content += "<tr><td width='100%'><b>Skype: strokeinfotech</b></td><td></td></tr>";
                            content += "<tr><td width='100%'><b>Mo: (+91) 8460569854</b></td><td></td></tr>";
                            content += "<tr><td width='100%'><b>Mo: (+91) 9974593600</b></td><td></td></tr>";
                            content += "</table>";
                            content += "</td></tr></table>";
                            content += "</body></html>";
                            //form data
                            if (pdfData !== undefined) {
                                const subjectName = "Salary Slip - " + empInfo.month + " " + empInfo.year
                                const formData = new FormData();
                                formData.append("form", emailData?.sender_email);
                                formData.append("to", emailData?.recipient_email);
                                formData.append("subject", emailData?.subject);
                                formData.append("filename", fileName);
                                formData.append("message", content);
                                formData.append("attachment", pdfData);
                                dispatch(genrateSalarySlip(formData, setShowEmailLoader, navigate))
                            }
                        });
                }
            } else {
                toast("Please Select Employee");
            }
        }, [1000]);
    };


    useEffect(() => {
        if (salarySlip !== undefined) {
            if (salarySlip.includes('OK')) {
                setIsDownloadClick(false);
                setSendEmail(false);
                setShowMessageBox(false)
            }
        }
    }, [salarySlip])

    useEffect(() => {
        if (sendEmail) {
            setIsDownloadClick(true);
            exportPDFWithComponent();
        }
    }, [sendEmail])

    //download PDF
    const handledownloadPdf = async () => {

        setTimeout(() => {
            if (value !== null) {
                if (pdfExportComponent.current) {
                    pdfExportComponent.current.save();
                    setDownloadPdf(false);
                }
            } else {
                toast("Please Select Employee");
            }
        }, [1000]);
    }
    useEffect(() => {
        if (downloadPdf) {
            handledownloadPdf();
        }
    }, [downloadPdf])

    const rupeeSymbolSVG = `<svg width="8" height="10" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10" font-family="Arial" font-size="12">₹</text></svg>`;


    return (
        <>
            <meta charset="UTF-8"></meta>
            <PDFExport
                ref={pdfExportComponent}
                scale={0.8}
                paperSize="A4"
                margin="1cm"
                fileName={fileName}
            >
                <Box id="pdfFile">
                    <Box sx={styles.wrapper} className='pdfwrapper' id="pdfDemo">
                        <Grid container sx={styles.companyInfoNew} className='companyInfoNew'>
                            <Grid item xs={6}>
                                <Typography variant="h3" className='signatureLabel'>Stroke Infotech </Typography>
                                {isDownloadClick ? (
                                    <Typography sx={styles.address}>{address ? address : ''}</Typography>
                                ) : (
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        placeholder="Enter address"
                                        multiline
                                        maxRows={4}
                                        sx={styles.multilineAddress}
                                        name="address"
                                        value={address}
                                        onChange={handleAddress}
                                    />
                                )}
                                <Typography variant='h6' sx={styles.gstNumber}>GSTIN: 24AFDFS3762F1Z2</Typography>
                            </Grid>
                            <Grid item xs={6} sx={styles.companyLogoContainer}>

                                <img className='company-logo' src='/strokeinfotech-logo.svg' alt='Stroke-Infotech-logo' width="70%" height="100%" />
                                <img className='company-logo' src='/strokeinfotech-logo.svg' alt='Stroke-Infotech-logo' width="70%" height="100%" style={{ display: 'none' }} />

                            </Grid>
                        </Grid>


                        <Box sx={styles.companyInfo}>

                            <Typography sx={styles.boldHeading} className='salaryslipLabel'>Salary Slip</Typography>
                            {isDownloadClick ?
                                <Box sx={styles.slipDatecontainer}>
                                    <Typography sx={styles.salarySlipData}>{empInfo ? empInfo.month + ", " + empInfo.year : ""}</Typography>
                                </Box>
                                : ""}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container item sx={styles.amountDetailGrid} className="amountDetailGrid">
                                <Grid item xs={12} md={isDownloadClick ? 8 : 12} sx={styles.employeeInfogridItem}>

                                    {isDownloadClick ?
                                        <>
                                            {/* <Typography className="inputLabels" sx={styles.boldHeading}>Employee Code:</Typography> */}
                                            <label className="inputLabels">Employee Code:</label>
                                            <Box sx={styles.inputValues}>
                                                {isDownloadClick ? (
                                                    <Typography sx={styles.salarySlipData}>{empInfo ? empInfo.emp_code : ""}</Typography>
                                                ) : (
                                                    <TextField
                                                        type="text"
                                                        id="standard-basic"
                                                        sx={styles.empData}
                                                        variant="standard"
                                                        name="emp_code"
                                                        value={empInfo ? empInfo.emp_code : ""}
                                                        onChange={handleEmployeeData}
                                                    />
                                                )}
                                            </Box>
                                        </>

                                        :
                                        <>
                                            <label className="inputLabels">Employee Name:</label>
                                            {/* <Typography className="inputLabels" sx={styles.boldHeading}>Employee Name:</Typography> */}
                                            <Box sx={styles.inputValues}>
                                                {isDownloadClick ? (
                                                    <Typography >{empInfo ? empInfo.emp_fullname : ""}</Typography>
                                                ) : (
                                                    <TextField
                                                        type="text"
                                                        id="standard-basic"
                                                        sx={styles.empData}
                                                        variant="standard"
                                                        name="emp_fullname"
                                                        value={empInfo ? empInfo.emp_fullname : ""}
                                                        onChange={handleEmployeeData}
                                                    />
                                                )}
                                            </Box>
                                        </>}
                                </Grid>




                                {isDownloadClick ?
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        sx={styles.employeeInfogridItem}
                                        className="leaveSection"
                                    >
                                        <label className="inputLabels">
                                            Total working days:
                                        </label>
                                        <Box>

                                            {isDownloadClick ? (
                                                <Typography
                                                    sx={styles.leavesCount}
                                                    className="leavesCount"
                                                >
                                                    {empInfo ? empInfo.totalWorkDays : ""}
                                                </Typography>
                                            ) : (
                                                <TextField
                                                    type="number"
                                                    sx={styles.leaveData}
                                                    name="totalWorkDays"
                                                    value={empInfo ? empInfo.totalWorkDays : ""}
                                                    onChange={handleDeduction}
                                                />
                                            )}
                                        </Box>
                                    </Grid>
                                    : ""}


                                <Grid item xs={12} md={isDownloadClick ? 8 : 6} sx={styles.employeeInfogridItem}>
                                    {isDownloadClick ?
                                        <>
                                            <label className="inputLabels">Employee Name:</label>

                                            <Box sx={styles.inputValues}>
                                                {isDownloadClick ? (
                                                    <Typography sx={styles.salarySlipData}>{empInfo ? empInfo.emp_fullname : ""}</Typography>
                                                ) : (
                                                    <TextField
                                                        type="text"
                                                        id="standard-basic"
                                                        sx={styles.empData}
                                                        variant="standard"
                                                        name="emp_fullname"
                                                        value={empInfo ? empInfo.emp_fullname : ""}
                                                        onChange={handleEmployeeData}
                                                    />
                                                )}
                                            </Box>
                                        </>
                                        :
                                        <>
                                            <label className="inputLabels">Employee Code:</label>
                                            <Box sx={styles.inputValues}>
                                                {isDownloadClick ? (
                                                    <Typography sx={styles.salarySlipData}>{empInfo ? empInfo.emp_code : ""}</Typography>
                                                ) : (
                                                    <TextField
                                                        type="text"
                                                        id="standard-basic"
                                                        sx={styles.empData}
                                                        variant="standard"
                                                        name="emp_code"
                                                        value={empInfo ? empInfo.emp_code : ""}
                                                        onChange={handleEmployeeData}
                                                    />
                                                )}
                                            </Box>
                                        </>}

                                </Grid>

                                {isDownloadClick ?
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        sx={styles.employeeInfogridItem}
                                        className="leaveSection"
                                    >
                                        <label className="inputLabels">
                                            leaves deducted:
                                        </label>
                                        <Box>
                                            {isDownloadClick ? (
                                                <Typography
                                                    sx={styles.salarySlipData}
                                                    className="leavesCount"
                                                >
                                                    {empInfo ? empInfo.leave : ""}
                                                </Typography>
                                            ) : (
                                                <TextField
                                                    type="number"
                                                    sx={styles.leaveData}
                                                    name="leave"
                                                    value={empInfo ? empInfo.leave : ""}
                                                    onChange={handleDeduction}
                                                />
                                            )}
                                        </Box>
                                    </Grid>
                                    : ""}


                                <Grid item xs={12} md={isDownloadClick ? 8 : 6} sx={styles.employeeInfogridItem}>
                                    <label className="inputLabels">Designation:</label>
                                    <Box sx={styles.inputValues}>
                                        {isDownloadClick ? (
                                            <Typography sx={styles.salarySlipData}>
                                                {empInfo ? empInfo.emp_designation : ""}
                                            </Typography>
                                        ) : (
                                            <TextField
                                                type="text"
                                                name="emp_designation"
                                                sx={styles.empData}
                                                value={empInfo ? empInfo.emp_designation : ""}
                                                variant="standard"
                                                onChange={handleEmployeeData}
                                            />
                                        )}
                                    </Box>
                                </Grid>


                                {isDownloadClick && enableSecurityHold && (
                                    <Grid item xs={12}
                                        md={4} sx={styles.employeeInfogridItem}>
                                        <label className="inputLabels">Security Hold:</label>
                                        <Box >
                                            {empInfo ? <Typography sx={styles.salarySlipData}><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo.security_hold?.toLocaleString("en-US")}</Typography> : ""}
                                        </Box>
                                    </Grid>
                                )}




                                {isDownloadClick && (
                                    <Grid item xs={12} md={8} sx={styles.employeeInfogridItem}>
                                        <label className="inputLabels">Gross Salary:</label>
                                        <Box sx={styles.inputValues}>
                                            <Typography sx={styles.salarySlipData}>{empInfo && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo.salary?.toLocaleString("en-US")}</span>)}</Typography>
                                        </Box>
                                    </Grid>
                                )}


                                {!isDownloadClick ?
                                    <Grid item xs={12} md={6} sx={styles.employeeInfogridItem}>
                                        <label className="inputLabels">Month:</label>

                                        <Box sx={styles.inputValues}>
                                            <TextField
                                                type="text"
                                                sx={styles.empData}
                                                name="month"
                                                value={empInfo ? empInfo.month : ""}
                                                variant="standard"
                                                onChange={handleEmployeeData}
                                            />
                                            {/* )} */}
                                        </Box>
                                    </Grid>
                                    : ""}

                                {!isDownloadClick ?

                                    <Grid item xs={12} md={6} sx={styles.employeeInfogridItem}>
                                        <label className="inputLabels" style={styles.lastLebel}> year:</label>
                                        <Box sx={styles.inputValues}>
                                            <TextField
                                                type="text"
                                                sx={styles.empData}
                                                name="year"
                                                value={empInfo ? empInfo.year : ""}
                                                variant="standard"
                                                onChange={handleEmployeeData}
                                            />
                                            {/* )} */}
                                        </Box>
                                    </Grid>
                                    : ""}
                            </Grid>
                        </Box>

                        <Box sx={styles.tableContent} className='tableContent'>
                            <Grid
                                container
                                spacing={1}
                                item
                            >
                                {!isDownloadClick ?
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        sx={styles.employeeInfogridItem}
                                        className="leaveSection"
                                    >
                                        <label className="inputLabels">
                                            Total working days:
                                        </label>
                                        <Box>
                                            <TextField
                                                type="number"
                                                sx={styles.leaveData}
                                                name="totalWorkDays"
                                                value={empInfo ? empInfo.totalWorkDays : ""}
                                                onChange={handleDeduction}
                                            />
                                        </Box>
                                    </Grid>
                                    : ""}
                                {!isDownloadClick ?
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        sx={styles.employeeInfogridItem}
                                        className="leaveSection"
                                    >
                                        <label className="inputLabels">
                                            Number of leaves deducted:
                                        </label>
                                        <Box>
                                            <TextField
                                                type="number"
                                                sx={styles.leaveData}
                                                name="leave"
                                                value={empInfo ? empInfo.leave : ""}
                                                onChange={handleDeduction}
                                            />
                                        </Box>
                                    </Grid>
                                    : ""}


                                {!isDownloadClick && (
                                    <>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={styles.employeeInfogridItem}
                                            className="leaveSection hideSection"
                                        >
                                            <label className="inputLabels">Gross Salary:</label>
                                            <Box>
                                                <TextField
                                                    type="number"
                                                    sx={styles.leaveData}
                                                    name="salary"
                                                    value={empInfo ? empInfo?.salary : ""}
                                                    onChange={handleDeduction}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={styles.employeeInfogridItem}
                                            className="leaveSection hideSection"
                                        >
                                            <label className="inputLabels">Net Calculation:</label>
                                            <Box>
                                                {isDownloadClick ? (
                                                    <Typography
                                                        sx={styles.salarySlipData}
                                                        className="leavesCount"
                                                    >
                                                        {empInfo ? empInfo?.calculation : ""}
                                                    </Typography>
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        sx={styles.leaveData}
                                                        name="calculation"
                                                        value={empInfo ? empInfo?.calculation : ""}
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </Box>
                                        </Grid>

                                    </>
                                )}

                                {!isDownloadClick && (
                                    <Grid item
                                        xs={12}
                                        md={6}
                                        sx={styles.employeeInfogridItem}
                                        className="leaveSection hideSection">
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={styles.employeeInfogridItem}
                                            className="leaveSection hideSection">
                                            <label className="inputLabels">Security Hold</label>
                                            <Box ml={1}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={handleChange} />
                                                </Stack>


                                            </Box>

                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={styles.employeeInfogridItem}
                                            className="leaveSection hideSection">
                                            <TextField
                                                type="number"
                                                variant="outlined"
                                                name="security_hold"
                                                disabled={!enableSecurityHold}
                                                value={empInfo ? empInfo.security_hold : ''}
                                                sx={[styles.allcharges, { visibility: enableSecurityHold ? 'visible' : 'hidden' }]}
                                                onChange={handleDeduction}
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>

                            <TableContainer>
                                <Table sx={isDownloadClick ? styles.tableNew : styles.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={styles.tableHeadings}>
                                                Earnings
                                            </TableCell>
                                            <TableCell sx={styles.tableHeadingAmount}>
                                                Amount
                                            </TableCell>
                                            <TableCell sx={styles.tableHeadings}>
                                                Deductions
                                            </TableCell>
                                            <TableCell sx={styles.tableHeadingAmount}>
                                                Amount
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={styles.tableCells}>
                                        <TableRow>
                                            <TableCell>Basic</TableCell>
                                            <TableCell>
                                                {isDownloadClick ?
                                                    salaryDescription.basic && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{salaryDescription?.basic.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                    // 
                                                    :
                                                    salaryDescription.basic && (<span>{salaryDescription?.basic.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                }
                                            </TableCell>
                                            <TableCell>Provident Fund </TableCell>
                                            <TableCell>
                                                {isDownloadClick ? (
                                                    empInfo ? (
                                                        <span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.provident_fund}</span>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (

                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="provident_fund"
                                                        value={empInfo ? empInfo?.provident_fund : ""}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>HRA</TableCell>
                                            <TableCell>
                                                {isDownloadClick ?
                                                    salaryDescription.basic && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{salaryDescription?.HRA.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                    :
                                                    salaryDescription.basic && (<span>{salaryDescription?.HRA.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                }
                                            </TableCell>

                                            <TableCell>E.S.I </TableCell>
                                            <TableCell>
                                                {isDownloadClick ? (
                                                    empInfo ? (
                                                        <span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.esi}</span>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    <TextField
                                                        variant="outlined"
                                                        name="esi"
                                                        value={empInfo ? empInfo?.esi : ""}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Uniform Allowance</TableCell>
                                            <TableCell >
                                                {isDownloadClick ?
                                                    salaryDescription.basic && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{salaryDescription?.uniform.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                    :
                                                    salaryDescription.basic && (<span>{salaryDescription?.uniform.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                }
                                            </TableCell>
                                            <TableCell>Loan</TableCell>
                                            <TableCell>
                                                {isDownloadClick ? (
                                                    empInfo ? (
                                                        <span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.loan}</span>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="loan"
                                                        value={empInfo ? empInfo?.loan : ""}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Travel Allowance</TableCell>
                                            <TableCell>

                                                {isDownloadClick ?
                                                    salaryDescription.basic && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{salaryDescription?.travel.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                    :
                                                    salaryDescription.basic && (<span>{salaryDescription?.travel.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                }

                                            </TableCell>
                                            <TableCell>Profession Tax</TableCell>
                                            <TableCell>
                                                {isDownloadClick ? (
                                                    empInfo && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.profession_tax}</span>)
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="profession_tax"
                                                        value={empInfo ? empInfo?.profession_tax : ""}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Paid Leaves</TableCell>
                                            <TableCell >
                                                {isDownloadClick ? (
                                                    empInfo && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.paidLeaves.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="paidLeaves"
                                                        value={empInfo ? empInfo?.paidLeaves : ''}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell
                                                sx={styles.allcharges}
                                                className="blank"
                                            >
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Bonus or Incentive</TableCell>
                                            <TableCell>
                                                {isDownloadClick ? (
                                                    empInfo && (
                                                        <span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.bonus?.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="bonus"
                                                        value={empInfo ? empInfo?.bonus : ''}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />
                                                )
                                                }
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell
                                                sx={styles.allcharges}
                                                className="blank"
                                            >
                                                -
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Other Earnings</TableCell>
                                            <TableCell>
                                                {isDownloadClick ? (
                                                    empInfo && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.otherEarnings?.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>)
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="otherEarnings"
                                                        value={empInfo ? empInfo?.otherEarnings : ''}
                                                        sx={styles.allcharges}
                                                        onChange={handleDeduction}
                                                    />)}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell
                                                sx={styles.allcharges}
                                                className="blank"
                                            >
                                                -
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell sx={styles.allcharges} className="blank">
                                                -
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell sx={styles.allcharges} className="blank">
                                                -
                                            </TableCell>
                                        </TableRow> */}

                                        <TableRow>
                                            <TableCell sx={styles.boldTableCell} className="bold">
                                                Gross Salary
                                            </TableCell>
                                            <TableCell
                                                sx={styles.boldTableCell}
                                                className="bold"
                                            >
                                                {isDownloadClick ? (
                                                    empInfo && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.gross_salary}</span>)
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        variant="outlined"
                                                        name="gross_salary"
                                                        value={empInfo ? empInfo?.gross_salary : ""}
                                                        sx={styles.allcharges}
                                                        className="totalCount"
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>Total Deductions</TableCell>
                                            <TableCell>
                                                {isDownloadClick ?
                                                    totalDeduction ? (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{totalDeduction}</span>) : <span>&#8377;0.00</span>
                                                    :
                                                    totalDeduction ? (<span>{totalDeduction?.toLocaleString("en-US")}</span>) : 0
                                                }
                                            </TableCell>
                                        </TableRow>

                                        {/* <TableRow >
                                            <TableCell ></TableCell>
                                            <TableCell ></TableCell>
                                            <TableCell ></TableCell>
                                            <TableCell sx={styles.allcharges} className="blank">
                                                -
                                            </TableCell>
                                        </TableRow> */}

                                        <TableRow>
                                            <TableCell ></TableCell>
                                            <TableCell sx={styles.allcharges} className="blank">-</TableCell>
                                            <TableCell
                                                sx={styles.boldTableCell}
                                                rowSpan={2}
                                            >
                                                NET Salary
                                            </TableCell>
                                            <TableCell
                                                sx={styles.boldTableCell}
                                                rowSpan={2}
                                            >
                                                {isDownloadClick ? (
                                                    empInfo && empInfo?.net_salary && (<span><span dangerouslySetInnerHTML={{ __html: rupeeSymbolSVG }} />{empInfo?.net_salary}</span>)
                                                ) : (
                                                    <TextField
                                                        variant="outlined"
                                                        name="net_salary"
                                                        value={empInfo ? empInfo?.net_salary : ""}
                                                        sx={styles.allcharges}
                                                        className="totalCount"
                                                        onChange={handleDeduction}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell ></TableCell>
                                            <TableCell sx={styles.allcharges} className="blank">-</TableCell>
                                            {/* <TableCell >0</TableCell>
                                            <TableCell sx={styles.allcharges} className="blank">
                                                -
                                            </TableCell> */}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box sx={styles.signatureContainer} className='signatureContainer'>
                            <Typography sx={styles.boldHeading} className='signatureLabel'>Stroke Infotech</Typography>

                            <Box className="image-item " sx={styles.uploadImage}>
                                {isDownloadClick ? (
                                    ""
                                ) : (
                                    <ImageUploading
                                        onChange={handleSignature}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                        value={[]}
                                    >
                                        {({
                                            onImageUpload,
                                            onImageUpdate,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            <Box className="upload__image-wrapper max-w-[40%] ml-auto">
                                                <button
                                                    className="mb-0 edit-button fill-primary"
                                                    style={isDragging ? { color: "red" } : undefined}
                                                    onClick={onImageUpdate}
                                                    {...dragProps}
                                                >
                                                    <svg
                                                        baseProfile="tiny"
                                                        height="24px"
                                                        fill="#898e92"
                                                        id="Layer_1"
                                                        version="1.2"
                                                        viewBox="0 0 24 24"
                                                        width="24px"
                                                        xmlSpace="preserve"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    >
                                                        <path d="M21.561,5.318l-2.879-2.879C18.389,2.146,18.005,2,17.621,2c-0.385,0-0.768,0.146-1.061,0.439L13,6H4C3.448,6,3,6.447,3,7  v13c0,0.553,0.448,1,1,1h13c0.552,0,1-0.447,1-1v-9l3.561-3.561C21.854,7.146,22,6.762,22,6.378S21.854,5.611,21.561,5.318z   M11.5,14.672L9.328,12.5l6.293-6.293l2.172,2.172L11.5,14.672z M8.939,13.333l1.756,1.728L9,15L8.939,13.333z M16,19H5V8h6  l-3.18,3.18c-0.293,0.293-0.478,0.812-0.629,1.289C7.031,12.969,7,13.525,7,13.939V17h3.061c0.414,0,1.108-0.1,1.571-0.29  c0.464-0.19,0.896-0.347,1.188-0.64L16,13V19z M18.5,7.672L16.328,5.5l1.293-1.293l2.171,2.172L18.5,7.672z" />
                                                    </svg>
                                                </button>
                                                <Box className="image-item ">
                                                    <Editor
                                                        className="w-full text-right image-editor"
                                                        onMount={handleSignature}
                                                        value={signatureContent}
                                                        contentStyle={{
                                                            overflow: "hidden",
                                                            height: "100%",
                                                            width: "100%",
                                                            padding: 0,
                                                        }}
                                                        onChange={handleSignatureDimension}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </ImageUploading>
                                )}

                                {isDownloadClick ? (
                                    <Box
                                        className="pdf-signature-image"
                                    >
                                        {imageWidth === undefined
                                            ? ReactHtmlParser(signatureContent)
                                            : ReactHtmlParser(imageWidth)}
                                    </Box>
                                ) : (
                                    ""
                                )}
                                <img
                                    src={signatureImg}
                                    width="100%"
                                    height="100%"
                                    style={{ display: "none" }}
                                />

                            </Box>
                            <Typography sx={styles.boldHeading} className='signatureLabel'>Authorized Signature</Typography>

                        </Box>

                    </Box>
                    <p style={styles.note} className='salary-note'>Note: This is computer generated pay slip which does not require authentication</p>
                </Box>
            </PDFExport >

        </>
    )
}




// const MyDocument = () => (
//     <Document>
//       <Page>
//         <SalarySlipFormat  />
//       </Page>
//     </Document>
//   );
