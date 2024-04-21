import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge, CButton, CCard, CCardBody, CCardHeader, CCollapse, CModal, CModalHeader,
  CModalTitle, CModalBody, CForm, CCol, CFormInput, CFormSelect, CFormTextarea, CRow
} from '@coreui/react';
import { CSmartTable } from '@coreui/react-pro';

const Colors = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState([]);
  const [visibleLg, setVisibleLg] = useState(false);
  const [repoName, setRepoName] = useState('');
  const [repoType, setRepoType] = useState('public');
  const [description, setDescription] = useState('');
  const username = "Onasanyagbenga";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const handleCreateRepository = async (event) => {
    event.preventDefault();
    try {
      const token = 'YOUR_GITHUB_ACCESS_TOKEN'; // Use your actual token and secure it appropriately
      const response = await axios.post(`https://api.github.com/user/repos`, {
        name: repoName,
        private: repoType === 'private',
        description: description
      }, {
        headers: {
          Authorization: `token ${token}`
        }
      });

      setVisibleLg(false); // Close modal on success
      setRepos([...repos, response.data]); // Optionally update UI
      alert('Repository created successfully!');
    } catch (error) {
      console.error('Failed to create repository:', error);
      alert('Failed to create repository.');
    }
    
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;
  if (!repos.length && !loading) return <p>No repositories found for user {username}.</p>;

  const columns = [
    { key: 'name', label: 'Name', _style: { width: '40%' } },
    { key: 'language', label: 'Language', _style: { width: '20%' } },
    { key: 'forks', label: 'Forks', _style: { width: '20%' } },
    { key: 'show_details', label: 'Details', _style: { width: '20%' }, sorter: false, filter: false },
  ];

  const toggleDetails = (id) => {
    setDetails(details.includes(id) ? details.filter(detailId => detailId !== id) : [...details, id]);
  };

  return (
    <CCard className="mb-4">
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Create Repository</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CForm className="row g-3" onSubmit={handleCreateRepository}>
            <CCol md={6}>
              <CFormInput type="email" id="inputEmail4" label="Repo Name" />
            </CCol>
            <CCol md={4}>
              <CFormSelect id="inputState" label="Repository Type">
                <option>Public Repo</option>
                <option>Private Repo</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CFormTextarea
                id="floatingTextarea"
                floatingLabel="Repository Description"
                placeholder="Leave a Description here"
              >
              </CFormTextarea>           
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">Create Repository</CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>

      <CCardHeader>
        <CButton color="primary" onClick={() => setVisibleLg(true)}>Create Repository</CButton>
      </CCardHeader>
      <CCardBody>
        <CSmartTable
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          footer
          items={repos}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          onFilteredItemsChange={(items) => console.log(items)}
          onSelectedItemsChange={(items) => console.log(items)}
          scopedColumns={{
            language: (item) => (
              <td><CBadge color={item.archived ? 'warning' : 'success'}>{item.language}</CBadge></td>
            ),
            show_details: (item) => (
              <td>
                <CButton color="primary" variant="outline" size="sm" onClick={() => toggleDetails(item.id)}>
                  {details.includes(item.id) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            ),
            details: (item) => (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody className="p-3">
                  <h4>{item.name}</h4>
                  <p className="text-muted">Description: {item.description || 'No description provided.'}</p>
                  <p><strong>Language:</strong> {item.language || 'Not specified'}</p>
                  <p><strong>Created on:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
                  <p><strong>Last updated:</strong> {new Date(item.updated_at).toLocaleDateString()}</p>
                  <p><strong>Forks:</strong> {item.forks_count}</p>
                  <p><strong>Stars:</strong> {item.stargazers_count}</p>
                  <p><strong>Watchers:</strong> {item.watchers_count}</p>
                  <p><strong>Open issues:</strong> {item.open_issues_count}</p>
                  <p><strong>Visibility:</strong> {item.visibility}</p>
                  <p><strong>Archived:</strong> {item.archived ? 'Yes' : 'No'}</p>
                  <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                    <CButton color="info" size="sm">Visit Repository</CButton>
                  </a>
                </CCardBody>
              </CCollapse>
            ),
          }}
        />
      </CCardBody>
    </CCard>
  );
}

export default Colors;
