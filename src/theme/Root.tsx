import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginPage from '../components/LoginPage';
import PermissionDenied from '../components/PermissionDenied';
import { useLocation } from '@docusaurus/router';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, hasAccess } = useAuth();
  const location = useLocation();
  const [pageAccess, setPageAccess] = useState<string | null>(null);

  useEffect(() => {
    const checkPageAccess = async () => {
      const path = location.pathname;

      if (path === '/' || path.startsWith('/blog') || path === '/markdown-page') {
        setPageAccess(null);
        return;
      }

      if (path.startsWith('/docs/')) {
        try {
          const docPath = path.replace('/docs/', '').replace(/\/$/, '');
          const possiblePaths = [
            docPath,
            `${docPath}/index`,
            docPath.split('/').pop()
          ];

          let foundAccess = null;
          for (const tryPath of possiblePaths) {
            try {
              const module = await import(`../../docs/${tryPath}.md`);
              if (module.frontMatter?.access) {
                foundAccess = module.frontMatter.access;
                break;
              }
            } catch (e) {
            }
          }

          setPageAccess(foundAccess);
        } catch (error) {
          setPageAccess(null);
        }
      } else {
        setPageAccess(null);
      }
    };

    checkPageAccess();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (pageAccess && !hasAccess(pageAccess)) {
    return <PermissionDenied />;
  }

  return <>{children}</>;
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}
