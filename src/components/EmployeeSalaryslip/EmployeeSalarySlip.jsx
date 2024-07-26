import React, { useEffect, useState } from "react";
import { getEmployees } from "../../Action/Employees";
import { genrateSalarySlip } from '../../Action/Admin';
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  CircularProgress,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import AutoComplete from "../SearchBar/AutoComplete";
import { styles } from "./EmployeeSalarySlip.style";
import { inputStyles } from "../FormInput.style";
import GetAppIcon from "@mui/icons-material/GetApp";
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SalarySlipFormat from "./SalarySlipFormat";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function EmployeeSalarySlip() {

  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const [showLoader, setShowLoader] = useState(false)

  const [isDownloadClick, setIsDownloadClick] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [showEmailLoader, setShowEmailLoader] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [enableSecurityHold, setEnableSecurityHold] = useState(true);

  const currentTime = new Date();
  const currmonth = currentTime.toLocaleString("default", { month: "long" });
  const curryear = currentTime.getFullYear();
  const [empInfo, setEmpInfo] = useState({
    provident_fund: 0,
    esi: 0,
    loan: 0,
    profession_tax: 200,
    month: currmonth,
    year: curryear,
    leave: 0,
    totalWorkDays: 21,
    calculation: 0,
    salary: 0,
    bonus: 0,
    paidLeaves: 0,
    otherEarnings: 0,
    security_hold :0
  });

  //email form
  const [emailData, setEmailData] = useState({
    sender_email: 'info@strokeinfotech.com',
    recipient_email: '',
    subject: '',
    greetings: '',
    message: 'See attached salary slip.'
  });
  const [address, setAddress] = useState(
    "407, Arth Business Center (ABC), Ring Road, opp. Torrent Power Sub Station, Nikol, Ahmedabad, Gujarat 382350"
  );
  const [signatureImg, setSignatureImg] = useState("/company-stamp.png");
  const [imageWidth, setImageWidth] = useState();
  const signatureContent = `<p style="text-align: left; margin-bottom:0;"><img src=${signatureImg} alt="" width="100%"    /></p>`;
  const navigate = useNavigate();
  const pdfExportComponent = React.useRef(null);
  const maxNumber = 69;
  const dispatch = useDispatch();
  const empData = useSelector((state) => state.EmployeesReducer?.employees);
  const salarySlip = useSelector((state) => state.generateSalarySlipReducer?.salarySlip);
  const { register, formState: { errors }, handleSubmit, watch } = useForm();

  useEffect(() => {
    dispatch(getEmployees(setLoading, navigate));
  }, []);

  useEffect(() => {
    if (value !== null) {
      setEmailData({
        ...emailData,
        recipient_email: value?.emp_email,
        subject: `Salary Slip - ${empInfo.month} ${empInfo.year}`,
        greetings: `Hi ${value?.emp_first_name},`
      })
    }
    else {
      setShowPreview(false)
    }
  }, [value]);

  useEffect(()=>{
    if (value !== null) {
      setEmailData({
        ...emailData,
        recipient_email: value?.emp_email,
        subject: `Salary Slip - ${empInfo.month} ${empInfo.year}`,
        greetings: `Hi ${value?.emp_first_name},`
      })
    }
  },[showMessageBox])

  useEffect(() => {
    setEmailData({ ...emailData, subject: `Salary Slip - ${empInfo.month} ${empInfo.year}` })
  }, [empInfo.month])
  useEffect(() => {
    setEmailData({ ...emailData, subject: `Salary Slip - ${empInfo.month} ${empInfo.year}` })
  }, [empInfo.year])

  //Preview
  const handlePreview = () => {
    if (value !== null) {
      setIsDownloadClick(true);
      setShowPreview(true);
    }
    else {
      toast("Please Select Employee");
    }
  }

  const handleFormchanges = (e) => {
    const { name, value } = e.target
    setEmailData({ ...emailData, [name]: value })
  }
  const onSubmit = (data) => {
    setSendEmail(!sendEmail)
  }
  return (
    <>
 

      <Box>
        {loading ? (
          <Box sx={styles.emptyDiv}>
            <CircularProgress sx={styles.loaderColor} />{" "}
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={styles.searchemployeeDetails}>
                  <Box sx={styles.searchEmployee}>
                    <AutoComplete
                      empData={empData.filter((emp) => emp.emp_status === 1)}
                      value={value}
                      setValue={setValue}
                    />
                  </Box>
                  <Stack direction="row" sx={styles.buttonSection}>
                    <Button
                      sx={styles.downloadButton}
                      variant="contained"
                      onClick={handlePreview}
                      startIcon={<PreviewIcon />}
                      style={{ color: showLoader ? "transparent" : "#fff" }}
                    >
                      Preview
                      {showLoader ?
                        <CircularProgress size={20} sx={styles.showLoaderForMail} />
                        : ""}

                    </Button>
                  </Stack>
                </Box>

                <SalarySlipFormat empInfo={empInfo} setEmpInfo={setEmpInfo} isDownloadClick={showMessageBox ? true : false} setIsDownloadClick={setIsDownloadClick} signatureImg={signatureImg} setSignatureImg={setSignatureImg} signatureContent={signatureContent} imageWidth={imageWidth} setImageWidth={setImageWidth} value={value ? value : ''}
                  setShowEmailLoader={setShowEmailLoader} setShowMessageBox={setShowMessageBox} setDownloadPdf={setDownloadPdf} setSendEmail={setSendEmail} emailData={emailData} address={address} setAddress={setAddress} enableSecurityHold={enableSecurityHold} setEnableSecurityHold={setEnableSecurityHold} />
              </Grid>

              <Grid item xs={6} >
                {showPreview ?
                  <>
                    <Box style={{ paddingTop: '8px', maxWidth: '670px' }}>
                      <Stack direction="row" sx={styles.buttonGroup}>
                        <Button sx={styles.sendmailButton} variant="contained" startIcon={<GetAppIcon />} style={{ color: downloadPdf ? "transparent" : "#fff" }} onClick={() => { setDownloadPdf(true) }}>
                          Download PDF
                          {downloadPdf ?
                            <CircularProgress size={20} sx={styles.showLoaderForMail} />
                            : ""}
                        </Button>
                        <Button sx={styles.sendmailButton} variant="contained" startIcon={showMessageBox ? <VisibilityOffIcon /> : <VisibilityIcon />} style={{ color: showEmailLoader ? "transparent" : "#fff" }} onClick={() => { 
                          setShowMessageBox(!showMessageBox);
                          }}>
                          {showMessageBox ? 'Hide Preview' : 'Email Preview'}

                        </Button>
                      </Stack>
                    </Box>
                    {showMessageBox && (
                      <Box style={{ marginTop: '40px', maxWidth: '670px' }}>

                        <Typography variant="h2" sx={styles.subTitle}>Edit Details</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}  >

                            <Grid item xs={12} sm={6} sx={styles.infoList}>
                              <Typography className="title">Sender Email*</Typography>
                              <TextField type="email" sx={inputStyles.formInput}
                                placeholder="enter email"
                                value={emailData?.sender_email}
                                name="sender_email"
                                {...register("sender_email", {
                                  required: "Sender Email is required", pattern: {
                                    value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                    message: 'Please Enter valid Email'
                                  }
                                })}
                                onChange={handleFormchanges}
                              />
                              {errors.sender_email ? <Alert severity="error"> {errors.sender_email?.message}</Alert> : ""}
                            </Grid>
                            <Grid item xs={12} sm={6} sx={styles.infoList}>
                              <Typography className="title">Recipient Email*</Typography>
                              <TextField type="email" sx={inputStyles.formInput}
                                placeholder="enter email"
                                value={emailData?.recipient_email}
                                name="recipient_email"
                                {...register("recipient_email", {
                                  required: "Recipient Email is required", pattern: {
                                    value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                    message: 'Please Enter valid Email'
                                  }
                                })}
                                onChange={handleFormchanges}
                              />
                              {errors.recipient_email ? <Alert severity="error"> {errors.recipient_email?.message}</Alert> : ""}
                            </Grid>
                            <Grid item xs={12} sm={6} sx={styles.infoList}>
                              <Typography className="title">Subject</Typography>
                              <TextField type="text" sx={inputStyles.formInput}
                                placeholder="enter subject"
                                value={emailData?.subject}
                                name="subject"
                                onChange={handleFormchanges}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={styles.infoList}>
                              <Typography className="title">Greetings</Typography>
                              <TextField type="text" sx={inputStyles.formInput}
                                placeholder="enter greetings"
                                value={emailData?.greetings}
                                name="greetings"
                                onChange={handleFormchanges}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={styles.infoList}>
                              <Typography className="title">Messages</Typography>
                              <TextField type="text" name="message" value={emailData?.message} style={{ lineHeight: "20px" }} multiline rows={3} sx={inputStyles.formInput} placeholder="Please Enter Message" onChange={handleFormchanges}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={styles.infoList} style={{ textAlign: 'center', marginTop: 20 }}>
                              <Button type="submit" sx={styles.sendmailButton} variant="contained" startIcon={<SendIcon />} style={{ color: showEmailLoader ? "transparent" : "#fff" }} >
                                Send Email
                                {showEmailLoader ?
                                  <CircularProgress size={20} sx={styles.showLoaderForMail} />
                                  : ""}
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    )}


                    <SalarySlipFormat empInfo={empInfo} setEmpInfo={setEmpInfo} isDownloadClick={true} setIsDownloadClick={setIsDownloadClick} signatureImg={signatureImg} setSignatureImg={setSignatureImg} signatureContent={signatureContent} imageWidth={imageWidth} setImageWidth={setImageWidth} value={value ? value : ''}
                      setShowEmailLoader={setShowEmailLoader} setShowMessageBox={setShowMessageBox} downloadPdf={downloadPdf} setDownloadPdf={setDownloadPdf} sendEmail={sendEmail} setSendEmail={setSendEmail} emailData={emailData} address={address}  enableSecurityHold={enableSecurityHold} />
                  </>
                  : ''}
              </Grid>
            </Grid>
          </>
        )}
        <Box sx={inputStyles.toastContainer}>
          <ToastContainer position="bottom-right" autoClose={10000} />
        </Box>
      </Box>


    </>
  );
}
