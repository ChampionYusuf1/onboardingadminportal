



import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import "@aws-amplify/ui-react/styles.css";
import React, { useState, useEffect } from "react";
import "./App.css";

type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};
function MerchantAccountDetails({ account }) {
  return (
    <div className="merchant-account">
      <h2>Merchant: {account.corporateName}</h2>
      <h3>Merchant info</h3>
      <p>Business ID: {account.id}</p>
      <p>Year Established: {account.yearEstablished}</p>
      <p>Account DBA Name: {account.dbaName}</p>
      <p>Corporate Name: {account.corporateName}</p>
      <p>TIN: {account.tin}</p>
      <p>W9 Entity Type: {account.w9EntityType}</p>
      <p>
        Address: {account.streetAddress}, {account.addressLine2}, {account.city}
        , {account.state} {account.postalZipCode}, {account.country}
      </p>
      <p>Business Phone: {account.businessPhone}</p>
      <p>Sales Tax: {account.salesTax}</p>
      <p>Estimated Monthly Volume {account.estimatedMonthlyVolume}</p>
      <p>Average Transaction Amount: {account.averageTransactionAmount}</p>
      <p>Website: {account.websiteUrl}</p>
      <p>Creation Date: {account.createdAt}</p>
    </div>
  );
}
 
function BankAccountDetails({ account }) {
  return (
    <div className="bank-account">
      <h3>Banking Info</h3>
      <p>Bank Account DB ID: {account.id}</p>
      <p>Bank Name: {account.bankName}</p>
      <p>Account No: {account.accountNumber}</p>
      <p>Routing No: {account.routingNumber}</p>
      <p>Signature: {account.signature}</p>
      <p>Created at: {account.createdAt}</p>
    </div>
  );
}
 
function PrincipalOwnerDetails({ account }) {
  return (
    <div className="principal-owner">
      <h3>Principal Owner Info</h3>
      <p>Principal Owner ID: {account.id}</p>
      <p>
        Name: {account.firstName} {account.middleName} {account.lastName}
      </p>
      <p>Email: {account.email}</p>
      <p>Percentage of Ownership: {account.percentageOfOwnership}</p>
      <p>
        Address: {account.streetAddress}, {account.addressLine2}, {account.city}
        , {account.state} {account.postalCode}, {account.country}
      </p>
      <p>DOB: {account.dateOfBirth}</p>
      <p>SSN: {account.ssn}</p>
      <p>Driver's License No: {account.driversLicenseNumber}</p>
      <p>Driver's License Issue Date: {account.driversLicenseIssueDate}</p>
      <p>Driver's License Expiry Date: {account.driversLicenseExpiryDate}</p>
      <p>Created At: {account.createdAt}</p>
      <p>Merchant Account ID: {account.merchantAccountID}</p>
    </div>
  );
}
const App: React.FC<AppProps> = ({ signOut, user }) => {
  const [merchantAccounts, setMerchantAccounts] = useState([]);
  const [newMerchantAccount, setNewMerchantAccount] = useState({
    addressLine2: "",
    averageTransactionAmount: 0,
    businessPhone: "",
    city: "",
    corporateName: "",
    country: "",
    dbaName: "",
    estimatedMonthlyVolume: 0,
    postalZipCode: "",
    salesTax: "",
    state: "",
    streetAddress: "",
    tin: "",
    w9EntityType: "",
    websiteUrl: "",
    yearEstablished: new Date().getFullYear(),
  });
  const [bankAccount, setBankAccount] = useState([]);
  const [newBankAccount, setNewBankAccount] = useState({
    accountNumber: "",
    bankName: "",
    routingNumber: "",
    signature: "",
    merchantAccountID: 0,
    id: 0,
  });
  const [principalOwner, setPrincipalOwner] = useState([]);
  const [newPrincipalOwner, setNewPrincipalOwner] = useState({
    addressLine2: "",
    city: "",
    country: "",
    dateOfBirth: "",
    driversLicenseExpiryDate: "",
    driversLicenseIssueDate: "",
    driversLicenseNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    merchantAccountID: 0,
    middleName: "",
    percentageOfOwnership: 0,
    postalCode: "",
    ssn: "",
    state: "",
    streetAddress: "",
  });
  useEffect(() => {
    fetch("http://localhost:3001/api/bankaccount") // Adjust if your endpoint is different
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBankAccount(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);
 
  useEffect(() => {
    fetch("http://localhost:3001/api/merchantaccount") // Adjust if your endpoint is different
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMerchantAccounts(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);
 
  useEffect(() => {
    fetch("http://localhost:3001/api/principalowner") // Adjust if your endpoint is different
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response.json());
        return response.json();
      })
      .then((data) => {
        setPrincipalOwner(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []); // Add a comma here
  
  
 

  

  return (
    <div style={styles.container}>
      <Heading level={1}>Hello {user?.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <h2>Amplify Todos</h2>
      <h1>Merchant Account Administration</h1>
      <div className="merchant-accounts-section">
        <div className="merchant-accounts-list">
          {merchantAccounts.map((account) => (
            <div key={account.id} className="merchant-account">
              <MerchantAccountDetails key={account.id} account={account} />
              {/* Add a delete button for each merchant account */}
              
              {/* You can add more details here */}
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
} as const;

export default withAuthenticator(App);