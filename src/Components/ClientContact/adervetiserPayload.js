export const payloadFun = (props) => {
    // console.log(props)
    let billingAddress1;
    let { companyName, webAdd, SalesPerson } = props.company
    let { primaryContact, secondaryContact, businessAddress, billingAddress } = props;
    if(props.copyCheck){
        billingAddress1={
            aaddress: businessAddress.address,
            address2: businessAddress.address2,
            city: businessAddress.city,
            postal: businessAddress.postal,
            country: businessAddress.country,
            // state: businessAddress.state.value,
            provinceID: businessAddress.stateProviance.value,
        }
    }
    else{
         billingAddress1={
            address: billingAddress.billaddress,
            address2: billingAddress.billaddress2,
            city: billingAddress.billcity,
            postal: billingAddress.billpostal,
            country: billingAddress.billcountry,
            // state: billingAddress.state.value,
            provinceID: billingAddress.billstateProviance,
        }
    }
    const payloadData = {
        companyName: companyName,
        companyWebsite: webAdd,
        personID: localStorage.personID,
        sosID: SalesPerson.value,
        companyType: localStorage.companyType,
        firstName: primaryContact.firstName,
        lastName: primaryContact.lastName,
        email: primaryContact.email,
        phone: primaryContact.phone,
        secondaryContact: {
            firstName: secondaryContact.firstName,
            lastName: secondaryContact.lastName,
            email: secondaryContact.email,
            phone: secondaryContact.phone,
        },
        contactAddress: {
            business: {
                address: businessAddress.address,
                address2: businessAddress.address2,
                city: businessAddress.city,
                postal: businessAddress.postal,
                country: businessAddress.country,
                // state: businessAddress.state.value,
                provinceID: businessAddress.stateProviance.value,
            },
            billing:billingAddress1
        },
        addressType: props.copyCheck ? "businessaddress" : "",
        useSame: props.copyCheck,
        roleCode: localStorage.roleCode,
        createdByPerson: localStorage.createdByPerson,
    };
    // console.log(payloadData)
    return payloadData
}