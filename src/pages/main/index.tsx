import MainLayout from '@/components/Layout/MainLayout';
import { Route, Routes } from 'react-router';
import Dashboard from './dashboard';
import UploadFile from './upload-files';
import Details from './details';
import RecordContent from './record-details';

const MainPages = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="uploads" element={<UploadFile />} />
        <Route path="details" element={<Details />} />
        <Route path="details/:id" element={<RecordContent />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default MainPages;
