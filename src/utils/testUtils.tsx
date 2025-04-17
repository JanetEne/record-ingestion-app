import { AuthContextProvider } from "@/lib/context/authContext";
import { UploadsContextProvider } from "@/lib/context/uploadsContext";
import { User } from "@/lib/interface/user"
import Dashboard from "@/pages/main/dashboard";
import UploadFile from "@/pages/main/upload-files";
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router";
import { vi } from 'vitest';

export const renderAuthWithContext = (user: User | null) => {
    return render(
        <AuthContextProvider value={{ user, updateUser: vi.fn(), isLoading: true, logout: vi.fn() }}>
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        </AuthContextProvider>
    );
};


export const mockUploadsContext = {
    uploads: [],
    updateUploads: vi.fn(),
    addUpload: vi.fn(),
    progress: 0,
    setProgress: vi.fn(),
    isProcessing: false,
    setIsProcessing: vi.fn(),
    processingSteps: [],
    setProcessingSteps: vi.fn(),
};

export const renderUploadsWithContext = (contextValue = mockUploadsContext) => {
    return render(
        <UploadsContextProvider value={contextValue}>
            <MemoryRouter>
                <UploadFile />
            </MemoryRouter>
        </UploadsContextProvider>
    );
};