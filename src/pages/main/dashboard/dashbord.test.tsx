import { renderAuthWithContext } from '@/utils/testUtils';
import { screen } from '@testing-library/react';

const mockUser = { firstName: 'John', lastName: 'Doe', email: 'janetene@gmail.com', id: '1234', mobileNumber: '123456789', password: 'password' };


describe('Dashboard Component', () => {
    test('displays welcome message with user’s first and last name', () => {
        renderAuthWithContext(mockUser);

        expect(screen.getByText('Welcome John Doe,')).toBeInTheDocument();
        expect(
            screen.getByText(
                /Upload CSV or XLSX files, process them, and view the details of the records/
            )
        ).toBeInTheDocument();
    });

    test('renders without crashing when user is null', () => {
        renderAuthWithContext(null);

        expect(screen.getByText('Welcome ,')).toBeInTheDocument();
        expect(
            screen.getByText(
                /Upload CSV or XLSX files, process them, and view the details of the records/
            )
        ).toBeInTheDocument();
    });

    test('renders Upload Files button with correct link', () => {
        renderAuthWithContext(null);

        const uploadButton = screen.getByRole('button', { name: /Upload Files/i });
        expect(uploadButton).toBeInTheDocument();
        expect(uploadButton.closest('a')).toHaveAttribute('href', '/uploads');
    });

    test('renders View Details button with correct link', () => {
        renderAuthWithContext(null);

        const viewButton = screen.getByRole('button', { name: /View Details/i });
        expect(viewButton).toBeInTheDocument();
        expect(viewButton.closest('a')).toHaveAttribute('href', '/details');
    });
});