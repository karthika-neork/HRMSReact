import React from 'react';
import DataTable from 'react-data-table-component';
import { FaFilePdf } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PayrollReport = () => {
  const columns = [
    {
      name: '#', selector: row => row.id, sortable: true, width: '60px',
      cell: row => <div title={row.id}>{row.id}</div>
    },

    {
      name: 'EMP-CODE', selector: row => row.empCode, sortable: true,
      cell: row => <div title={row.empCode}>{row.empCode}</div>
    },

    {
      name: 'NAME', selector: row => row.name, sortable: true,
      cell: row => <div title={row.name}>{row.name}</div>
    },

    {
      name: 'DESIGNATION', selector: row => row.designation, sortable: true,
      cell: row => <div title={row.designation}>{row.designation}</div>
    },

    {
      name: 'TMD', selector: row => row.tmd, sortable: true, right: true,
      cell: row => <div title={row.tmd}>{row.tmd}</div>
    },

    {
      name: 'TWD', selector: row => row.twd, sortable: true, right: true,
      cell: row => <div title={row.twd}>{row.twd}</div>
    },

    {
      name: 'GS', selector: row => row.gs, sortable: true, right: true,
      cell: row => <div title={row.gs}>{row.gs}</div>
    },

    {
      name: 'BASIC', selector: row => row.basic, sortable: true, right: true,
      cell: row => <div title={row.basic}>{row.basic}</div>
    },

    {
      name: 'DA', selector: row => row.da, sortable: true, right: true,
      cell: row => <div title={row.da}>{row.da}</div>
    },

    {
      name: 'HRA', selector: row => row.hra, sortable: true, right: true,
      cell: row => <div title={row.hra}>{row.hra}</div>
    },

    {
      name: 'MA', selector: row => row.medicalAllowance, sortable: true, right: true,
      cell: row => <div title={row.medicalAllowance}>{row.medicalAllowance}</div>
    },

    {
      name: 'CA', selector: row => row.conveyanceAllowance, sortable: true, right: true,
      cell: row => <div title={row.conveyanceAllowance}>{row.conveyanceAllowance}</div>
    },

    {
      name: 'EA', selector: row => row.entertainmentAllowance, sortable: true, right: true,
      cell: row => <div title={row.entertainmentAllowance}>{row.entertainmentAllowance}</div>
    },

    {
      name: 'EDU', selector: row => row.educationAllowance, sortable: true, right: true,
      cell: row => <div title={row.educationAllowance}>{row.educationAllowance}</div>
    },

    {
      name: 'SA', selector: row => row.specialAllowance, sortable: true, right: true,
      cell: row => <div title={row.specialAllowance}>{row.specialAllowance}</div>
    },

    {
      name: 'OT', selector: row => row.overtimeAllowance, sortable: true, right: true,
      cell: row => <div title={row.overtimeAllowance}>{row.overtimeAllowance}</div>
    },

    {
      name: 'LOP', selector: row => row.lop, sortable: true, right: true,
      cell: row => <div title={row.lop}>{row.lop}</div>
    },

    {
      name: 'DEDUCTIONS', selector: row => row.totalDeductions, sortable: true, right: true,
      cell: row => <div title={row.totalDeductions}>{row.totalDeductions}</div>
    },

    {
      name: 'NET SALARY', selector: row => row.netSalary, sortable: true, right: true,
      cell: row => <div title={row.netSalary}>{row.netSalary}</div>
    },

    {
      name: (
        <div className="d-flex align-items-center gap-2">
          <span>PDF</span>
          <a className='mb-2' onClick={() => generatePDF()} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "2rem", color: "blue" }}>
            <FontAwesomeIcon style={{ width: "", height: "20px" }} icon={faFilePdf} />
          </a>
        </div>
      ),
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <a className='mb-2' onClick={() => generatePDF(row)}
            style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "2rem", color: "blue" }}>
            <FontAwesomeIcon style={{ width: "", height: "20px" }} icon={faFilePdf} />
          </a>
        </div>
      )
    },
  ];


  // PDF Generator Function
  // const generatePDF = async (formdata = null) => {
  //   const doc = new jsPDF();
  
  //   const imgUrl = "https://i.postimg.cc/xdr6DCmg/neork-logo-200.png";
  //   const imgWidth = 40;
  //   const imgHeight = 20;
  
  //   // Add Image to PDF
  //   try {
  //     const imgData = await getBase64ImageFromUrl(imgUrl);
  //     doc.addImage(imgData, "PNG", 150, 10, imgWidth, imgHeight);
  //   } catch (error) {
  //     console.error("Error loading image:", error);
  //   }
  
  //   doc.text("Payroll Report", 14, 30);
  
  //   if (formdata) {
  //     // Generate single row PDF
  //     autoTable(doc, {
  //       startY: 40,
  //       head: [["Field", "Value"]],
  //       body: [
  //         ["EMP-CODE", formdata.empCode],
  //         ["Name", formdata.name],
  //         ["Designation", formdata.designation],
  //         ["TMD", formdata.tmd],
  //         ["TWD", formdata.twd],
  //         ["GS", formdata.gs],
  //         ["Basic", formdata.basic],
  //         ["DA", formdata.da],
  //         ["HRA", formdata.hra],
  //         ["MA", formdata.medicalAllowance],
  //         ["CA", formdata.conveyanceAllowance],
  //         ["EA", formdata.entertainmentAllowance],
  //         ["EDU", formdata.educationAllowance],
  //         ["SA", formdata.specialAllowance],
  //         ["OT", formdata.overtimeAllowance],
  //         ["LOP", formdata.lop],
  //         ["Deductions", formdata.totalDeductions],
  //         ["Net Salary", formdata.netSalary],
  //       ],
  //     });
  //     doc.save(`${formdata.name}_Payroll.pdf`);
  //   } else {
  //     // Generate complete table PDF
  //     autoTable(doc, {
  //       startY: 40,
  //       head: [
  //         [
  //           "#",
  //           "EMP-CODE",
  //           "NAME",
  //           "DESIGNATION",
  //           "TMD",
  //           "TWD",
  //           "GS",
  //           "BASIC",
  //           "DA",
  //           "HRA",
  //           "MA",
  //           "CA",
  //           "EA",
  //           "EDU",
  //           "SA",
  //           "OT",
  //           "LOP",
  //           "DEDUCTIONS",
  //           "NET SALARY",
  //         ],
  //       ],
  //       body: data.map((row) => [
  //         row.id,
  //         row.empCode,
  //         row.name,
  //         row.designation,
  //         row.tmd,
  //         row.twd,
  //         row.gs,
  //         row.basic,
  //         row.da,
  //         row.hra,
  //         row.medicalAllowance,
  //         row.conveyanceAllowance,
  //         row.entertainmentAllowance,
  //         row.educationAllowance,
  //         row.specialAllowance,
  //         row.overtimeAllowance,
  //         row.lop,
  //         row.totalDeductions,
  //         row.netSalary,
  //       ]),
        
  //     });
  //     doc.save("Payroll_Report.pdf");
  //   }
  // };
  const generatePDF = async (formdata = null) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth(); // Get page width dynamically
  
    const imgUrl = "https://i.postimg.cc/xdr6DCmg/neork-logo-200.png";
    const imgWidth = 25; // Reduced width
    const imgHeight = 15; // Reduced height
  
    // Add Image to PDF (Top-left corner with spacing)
    try {
      const imgData = await getBase64ImageFromUrl(imgUrl);
      doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  
    // Add Centered Title with more margin from the image
    const title = "Payroll Report";
    const textWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - textWidth) / 2, 35); // Added more spacing below the image
  
    if (formdata) {
      // Generate single row PDF
      autoTable(doc, {
        startY: 45, // Moved table up slightly
        head: [["Field", "Value"]],
        body: [
          ["EMP-CODE", formdata.empCode],
          ["Name", formdata.name],
          ["Designation", formdata.designation],
          ["TMD", formdata.tmd],
          ["TWD", formdata.twd],
          ["GS", formdata.gs],
          ["Basic", formdata.basic],
          ["DA", formdata.da],
          ["HRA", formdata.hra],
          ["MA", formdata.medicalAllowance],
          ["CA", formdata.conveyanceAllowance],
          ["EA", formdata.entertainmentAllowance],
          ["EDU", formdata.educationAllowance],
          ["SA", formdata.specialAllowance],
          ["OT", formdata.overtimeAllowance],
          ["LOP", formdata.lop],
          ["Deductions", formdata.totalDeductions],
          ["Net Salary", formdata.netSalary],
        ],
      });
      doc.save(`${formdata.name}_Payroll.pdf`);
    } else {
      // Generate complete table PDF
      autoTable(doc, {
        startY: 40, // Moved table slightly up
        head: [[
          "#", "EMP-CODE", "NAME", "DESIGNATION", "TMD", "TWD", "GS", "BASIC", "DA", "HRA", "MA", "CA", "EA", "EDU", "SA", "OT", "LOP", "DEDUCTIONS", "NET SALARY"
        ]],
        body: data.map(row => [
          row.id, row.empCode, row.name, row.designation, row.tmd, row.twd, row.gs, row.basic, row.da, row.hra,
          row.medicalAllowance, row.conveyanceAllowance, row.entertainmentAllowance, row.educationAllowance,
          row.specialAllowance, row.overtimeAllowance, row.lop, row.totalDeductions, row.netSalary
        ]),
        styles: { fontSize: 5, cellPadding: 0, halign: "center" },
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontSize: 6, halign: "center" },
      });
      doc.save("Payroll_Report.pdf");
    }
  };


  
  const getBase64ImageFromUrl = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const data = [
    {
      id: 1, empCode: 'sl12', name: 'Abhijith S', designation: 'Junior Tester',
      tmd: 31, twd: 31, gs: 0, basic: 0, da: 0, hra: 0,
      medicalAllowance: 0, conveyanceAllowance: 0, entertainmentAllowance: 0,
      educationAllowance: 0, specialAllowance: 0, overtimeAllowance: '4.5 hrs',
      lop: 0, totalDeductions: 0, netSalary: 0
    },

    {
      id: 2, empCode: '', name: 'Admin', designation: '',
      tmd: 31, twd: 31, gs: 0, basic: 0, da: 0, hra: 0,
      medicalAllowance: 0, conveyanceAllowance: 0, entertainmentAllowance: 0,
      educationAllowance: 0, specialAllowance: 0, overtimeAllowance: 0,
      lop: 0, totalDeductions: 0, netSalary: 0
    },

    {
      id: 3, empCode: '88', name: 'Anupamaa Binu', designation: 'Junior Tester',
      tmd: 31, twd: 31, gs: 87, basic: 23.00, da: 31.00, hra: 33.00,
      medicalAllowance: 1500, conveyanceAllowance: 800, entertainmentAllowance: 500,
      educationAllowance: 1200, specialAllowance: 2000, overtimeAllowance: 0,
      lop: 0, totalDeductions: 0, netSalary: 87
    }
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: 'white',
      },
    },
    rows: {
      style: {
        minHeight: '52px',
        fontSize: '14px',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: 600,
      },
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="text-xl font-bold">PAYROLE LIST</h1>
          </div>
          <hr />
          <div className="d-flex justify-content-end align-items-center mb-3">
  <div className="d-flex align-items-center gap-3">
    <select className=" form-select rounded-md">
      <option>January</option>
      <option>February</option>
      <option>March</option>
      <option>April</option>
      <option>May</option>
      <option>June</option>
      <option>July</option>
      <option>August</option>
      <option>September</option>
      <option>October</option>
      <option>November</option>
      <option>December</option>
    </select>
    <select className="px-4 py-2 form-select">
      <option>2025</option>
      <option>2026</option>
      <option>2027</option>
      <option>2028</option>
      <option>2029</option>
      <option>2030</option>
      <option>2031</option>
      <option>2032</option>
      <option>2033</option>
      <option>2034</option>
      <option>2035</option>
    </select>
    <button className="btn btn-primary px-4 py-2">
      Search
    </button>
    <button className="btn btn-outline-secondary px-4 py-2" style={{ whiteSpace: "nowrap" }}>
      Clear Filter
    </button>
  </div>
</div>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          responsive
          highlightOnHover
          striped
          fixedHeader
          fixedHeaderScrollHeight="500px"
        />
      </div>
    </div>
  );
};

export default PayrollReport;