import { cleanupFileData } from '@/utils/cleanupFileData';
import { parseCSV } from '@/utils/parseFiles';
import { mockUploadsContext, renderUploadsWithContext } from '@/utils/testUtils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

vi.mock('@/utils/parseFiles', () => ({
    parseCSV: vi.fn(),
    parseXLSX: vi.fn(),
}));

vi.mock('@/utils/cleanupFileData', () => ({
    cleanupFileData: vi.fn(),
}));


describe('UploadFile Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the upload form with all fields', () => {
        renderUploadsWithContext();

        expect(screen.getByText('Upload File')).toBeInTheDocument();
        expect(screen.getByText(/CSV or XLSX, max 5mb/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Upload File/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
    });

    // it('submits a CSV file and navigates to /details on success', async () => {
    //     const user = userEvent.setup();
    //     renderUploadsWithContext();

    //     const mockFile = new File(['id,name\n1,John'], 'test.csv', { type: 'text/csv' });
    //     (parseCSV as ReturnType<typeof vi.fn>).mockResolvedValue([{ id: '1', name: 'John' }]);
    //     (cleanupFileData as ReturnType<typeof vi.fn>).mockResolvedValue([{ id: '1', name: 'John' }]);
    //     (axios.post as ReturnType<typeof vi.fn>).mockResolvedValue({
    //         data: { data: { id: '1', fileName: 'test.csv' }, message: 'Upload successful' },
    //     });

    //     await user.type(screen.getByLabelText(/Start Date/i), '2023-01-01');
    //     await user.type(screen.getByLabelText(/End Date/i), '2023-12-31');
    //     await user.click(screen.getByLabelText(/Date Type/i));
    //     await user.click(screen.getByText('1 month'));
    //     await user.upload(screen.getByLabelText(/Upload File/i), mockFile);

    //     await user.click(screen.getByRole('button', { name: 'Upload' }));

    //     await waitFor(() => {
    //         expect(mockUploadsContext.setIsProcessing).toHaveBeenCalledWith(true);
    //         expect(mockUploadsContext.setProgress).toHaveBeenCalledWith(10);
    //         expect(axios.post).toHaveBeenCalledWith('/api/uploads', expect.any(Object));
    //         expect(mockUploadsContext.addUpload).toHaveBeenCalledWith({ id: '1', fileName: 'test.csv' });
    //         expect(screen.getByText('Upload successful')).toBeInTheDocument();
    //     });
    // });

    // it('displays error toast on upload failure', async () => {
    //     const user = userEvent.setup();
    //     renderUploadsWithContext();

    //     const mockFile = new File(['id,name\n1,John'], 'test.csv', { type: 'text/csv' });
    //     (parseCSV as ReturnType<typeof vi.fn>).mockResolvedValue([{ id: '1', name: 'John' }]);
    //     (cleanupFileData as ReturnType<typeof vi.fn>).mockResolvedValue([{ id: '1', name: 'John' }]);
    //     (axios.post as ReturnType<typeof vi.fn>).mockRejectedValue({
    //         response: { data: { error: 'Upload failed' } },
    //     });

    //     await user.type(screen.getByLabelText(/Start Date/i), '2023-01-01');
    //     await user.type(screen.getByLabelText(/End Date/i), '2023-12-31');
    //     await user.click(screen.getByLabelText(/Date Type/i));
    //     await user.click(screen.getByText('1 month'));
    //     await user.upload(screen.getByLabelText(/Upload File/i), mockFile);

    //     await user.click(screen.getByRole('button', { name: 'Upload' }));

    //     await waitFor(() => {
    //         expect(screen.getByText('Upload failed')).toBeInTheDocument(); 
    //         expect(mockUploadsContext.setIsProcessing).toHaveBeenCalledWith(false);
    //     });
    // });

    // it('displays progress bar and steps during processing', async () => {
    //     const user = userEvent.setup();
    //     renderUploadsWithContext();

    //     const mockFile = new File(['id,name\n1,John'], 'test.csv', { type: 'text/csv' });
    //     (parseCSV as ReturnType<typeof vi.fn>).mockResolvedValue([{ id: '1', name: 'John' }]);
    //     (cleanupFileData as ReturnType<typeof vi.fn>).mockResolvedValue([{ id: '1', name: 'John' }]);
    //     (axios.post as ReturnType<typeof vi.fn>).mockResolvedValue({
    //         data: { data: { id: '1', fileName: 'test.csv' }, message: 'Upload successful' },
    //     });

    //     await user.upload(screen.getByLabelText(/Upload File/i), mockFile);
    //     await user.click(screen.getByRole('button', { name: /Upload/i }));

    //     await waitFor(() => {
    //         expect(screen.getByText(/Processing... \(10%\)/i)).toBeInTheDocument();
    //         expect(screen.getByRole('progressbar')).toHaveAttribute('value', '10');
    //     });
    // });
});