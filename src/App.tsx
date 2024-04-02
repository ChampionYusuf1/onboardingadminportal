import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "./Login";
interface MerchantAccount {
  id: string;
  corporateName: string;
  yearEstablished: number;
  dbaName: string;
  tin: string;
  w9EntityType: string;
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  postalZipCode: string;
  country: string;
  businessPhone: string;
  salesTax: number;
  estimatedMonthlyVolume: number;
  averageTransactionAmount: number;
  websiteUrl: string;
  createdAt: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  signature: string;
  createdAt: string;
  // add other relevant properties
}

interface PrincipalOwner {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  percentageOfOwnership: number;
  streetAddress: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
  ssn: string;
  driversLicenseNumber: string;
  driversLicenseIssueDate: string;
  driversLicenseExpiryDate: string;
  createdAt: string;
  // add other relevant properties
}
const backendUrl = 'https://main.ddf5kpcmp1ss0.amplifyapp.com/api';
function MerchantAccountDetails({ account }: { account: any }) {
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
 
function BankAccountDetails({ account }: { account: any }) {
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
 
function PrincipalOwnerDetails({ account }: { account: any }) {
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
 
function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Rest of your component...

 
  
  const [merchantAccounts, setMerchantAccounts] = useState<MerchantAccount[]>([]);
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
  const [, setBankAccount] = useState<BankAccount[]>([]);
  //  const [bankAccounts, setBankAccount] = useState<BankAccount[]>([]);

  const [newBankAccount, setNewBankAccount] = useState({
    accountNumber: "",
    bankName: "",
    routingNumber: "",
    signature: "",
    merchantAccountID: 0,
    id: 0,
  });
 // const [principalOwners, setPrincipalOwner] = useState<PrincipalOwner[]>([]);
 const [, setPrincipalOwner] = useState<PrincipalOwner[]>([]);
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
 

  const deleteMerchantAccount = (id: any) => {
    fetch(`${backendUrl}/merchantaccount`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add this line
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the deleted account from state
        setMerchantAccounts(
          merchantAccounts.filter((account) => account.id !== id)
        );
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your delete operation:",
          error
        );
      });
  };

  // new account
  const handleNewMerchantAccountChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewMerchantAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleNewBankAccountChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewBankAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handlePrincipalOwnerChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewPrincipalOwner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  // merchant account simbit button
  const handleNewAccountSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Compile data into a single object
    const fullMerchantAccountData = {
        merchantDetails: newMerchantAccount,
        bankDetails: newBankAccount,
        ownerDetails: newPrincipalOwner,
    };

    // Post the data to the createFullMerchant endpoint
    fetch(`${backendUrl}/merchantaccount`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fullMerchantAccountData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        // Here you might want to update your application state to include the new merchant account
        // For example, you might refresh the list of merchant accounts from the server
        // or add the newly created account to your state directly if the API returns it.
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // Reset form fields after submission or upon successful creation
    // This is a simple way; you might want to do this only if the request succeeds.
    setNewMerchantAccount({
        // Reset fields to initial state
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
    setNewBankAccount({

         accountNumber: "",
    bankName: "",
    routingNumber: "",
    signature: "",
    merchantAccountID: 0, // Note: This field may not be necessary for the form reset, as it is likely set programmatically based on the created merchant account
    id: 0, // Similar to merchantAccountID, this may not be necessary to reset
    });
    setNewPrincipalOwner({
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
      merchantAccountID: 0, // Note: This field may not be necessary for the form reset, as it is likely set programmatically based on the created merchant account
      middleName: "",
      percentageOfOwnership: 0,
      postalCode: "",
      ssn: "",
      state: "",
      streetAddress: "",
    });
};

 
  return (
    <div className="App">
      {/* Form to create a new merchant account */}
      <form onSubmit={handleNewAccountSubmit}>
        <h2>Create a New Merchant Account</h2>
        {/* Add input fields for each property of MerchantAccount */}
        {/* For example: */}
        <h3>Merchant Info</h3>
        <label>
          Corporate Name:
          <input
            type="text"
            name="corporateName"
            value={newMerchantAccount.corporateName}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          TIN:
          <input
            type="text"
            name="tin"
            value={newMerchantAccount.tin}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          W-9 Entity Type:
          <input
            type="text"
            name="w9EntityType"
            value={newMerchantAccount.w9EntityType}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Street Address:
          <input
            type="text"
            name="streetAddress"
            value={newMerchantAccount.streetAddress}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Street Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={newMerchantAccount.addressLine2}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={newMerchantAccount.city}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={newMerchantAccount.state}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="postalZipCode"
            value={newMerchantAccount.postalZipCode}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={newMerchantAccount.country}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Business Phone No:
          <input
            type="text"
            name="businessPhone"
            value={newMerchantAccount.businessPhone}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Sales Tax:
          <input
            type="text"
            name="salesTax"
            value={newMerchantAccount.salesTax}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Estimated Monthly Volume:
          <input
            type="text"
            name="estimatedMonthlyVolume"
            value={newMerchantAccount.estimatedMonthlyVolume}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Average Transaction Amount:
          <input
            type="text"
            name="averageTransactionAmount"
            value={newMerchantAccount.averageTransactionAmount}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <label>
          Website URL:
          <input
            type="text"
            name="websiteUrl"
            value={newMerchantAccount.websiteUrl}
            onChange={handleNewMerchantAccountChange}
            required
          />
        </label>
        <h3>Banking Info</h3>
        <label>
          Bank Name:
          <input
            type="text"
            name="bankName"
            value={newBankAccount.bankName}
            onChange={handleNewBankAccountChange}
            required
          />
        </label>
        <label>
          Account No:
          <input
            type="text"
            name="accountNumber"
            value={newBankAccount.accountNumber}
            onChange={handleNewBankAccountChange}
            required
          />
        </label>
        <label>
          Routing No:
          <input
            type="text"
            name="routingNumber"
            value={newBankAccount.routingNumber}
            onChange={handleNewBankAccountChange}
            required
          />
        </label>
        <label>
          Signature:
          <input
            type="text"
            name="signature"
            value={newBankAccount.signature}
            onChange={handleNewBankAccountChange}
            required
          />
        </label>
        <h3>Principal Owner Info</h3>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={newPrincipalOwner.firstName}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Middle Name:
          <input
            type="text"
            name="middleName"
            value={newPrincipalOwner.middleName}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newPrincipalOwner.lastName}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Email Address:
          <input
            type="text"
            name="email"
            value={newPrincipalOwner.email}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Percentage of Ownership:
          <input
            type="text"
            name="percentageOfOwnership"
            value={newPrincipalOwner.percentageOfOwnership}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Street Address:
          <input
            type="text"
            name="streetAddress"
            value={newPrincipalOwner.streetAddress}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Street Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={newPrincipalOwner.addressLine2}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={newPrincipalOwner.city}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={newPrincipalOwner.state}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={newPrincipalOwner.postalCode}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={newPrincipalOwner.country}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={newPrincipalOwner.dateOfBirth}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          SSN:
          <input
            type="text"
            name="ssn"
            value={newPrincipalOwner.ssn}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Driver's License No:
          <input
            type="text"
            name="driversLicenseNumber"
            value={newPrincipalOwner.driversLicenseNumber}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Driver's License Issue Date:
          <input
            type="date"
            name="driversLicenseIssueDate"
            value={newPrincipalOwner.driversLicenseIssueDate}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
        <label>
          Driver's License Expiry Date:
          <input
            type="date"
            name="driversLicenseExpiryDate"
            value={newPrincipalOwner.driversLicenseExpiryDate}
            onChange={handlePrincipalOwnerChange}
            required
          />
        </label>
 
        {/* Repeat for each field */}
        <button type="submit">Create Merchant Account</button>
      </form>
 
      {/* ... rest of the app, including merchant accounts list */}
      <h1>Merchant Account Administration</h1>
      <div className="merchant-accounts-section">
        <div className="merchant-accounts-list">
          {merchantAccounts.map((account: { id: string }) => (
            <div key={account.id} className="merchant-account">
              <MerchantAccountDetails key={account.id} account={account} />
                <BankAccountDetails key={account.id} account={account} />
                  <PrincipalOwnerDetails key={account.id} account={account} />
              {/* Add a delete button for each merchant account */}
              <button onClick={() => deleteMerchantAccount(account.id)}>
                Delete
              </button>
              {/* You can add more details here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default App;