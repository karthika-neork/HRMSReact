import React, { useEffect, useState } from 'react'

function RolePermission({ permissions, mode, onPermissionsChange, roleData }) {

      const [selectedPermissions, setSelectedPermissions] = useState({});
    
      useEffect(() => {
        const initialSelectedPermissions = {};
        if (mode === 'edit' && roleData) {
          Object.keys(permissions).forEach(category => {
            permissions[category].forEach(permission => {
              // Check if the permission is present in roleData
              if (roleData.some(item => item.permission === permission.permission)) {
                initialSelectedPermissions[permission.permission] = true;
              } else{
                initialSelectedPermissions[permission.permission] = false;
              }
            });
          });
          setSelectedPermissions(initialSelectedPermissions);
        } else {
          // Reset selectedPermissions if not in edit mode
          setSelectedPermissions({});
        }
      }, [permissions, mode, roleData]);
    
      useEffect(() => {
        if (Object.keys(selectedPermissions).length > 0) {
          const selectedPermissionsArray = Object.keys(selectedPermissions).filter(key => selectedPermissions[key]);
          onPermissionsChange(selectedPermissionsArray);
        }
      }, [selectedPermissions]);
    
      const handleCheckboxChange = (permissionName) => {
        setSelectedPermissions(prevState => ({
          ...prevState,
          [permissionName]: !prevState[permissionName]
        }));
      };
    
      const isValidPermission = (permission) => {
        return permission && typeof permission.permission === 'string' && permission.permission.trim() !== '';
      };
    
      return (
        <div>
          <h5>{mode === 'edit' ? 'Edit Permissions' : 'Add Permissions'}</h5>
          <div className='row mt-3'>
            <div id="permissions" className="col-lg-12 col-sm-12">
              {Object.keys(permissions).length === 0 ? (
                <p>No permissions available</p>
              ) : (
                Object.keys(permissions).map((category) => {
                  const categoryPermissions = permissions[category] || [];
    
                  return (
                    <div className='mt-3' key={category}>
                      <h5>{category}</h5>
                      {categoryPermissions.length > 0 ? (
                        categoryPermissions.filter(isValidPermission).map((permission) => (
                          <div key={permission.permission} className="form-check form-check-inline ">
                            <input 
                              type="checkbox"
                              className="custom-checkbox "
                              id={`permission-${permission.permission}`}
                              checked={selectedPermissions[permission.permission] || false}
                              onChange={() => handleCheckboxChange(permission.permission)}
                            />
                            <label htmlFor={`permission-${permission.permission}`}>
                              {permission.permission.split('-').slice(1).join(' ')}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p>No valid permissions available</p>
                      )}
                      <br/>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      );
    }
    
    
export default RolePermission