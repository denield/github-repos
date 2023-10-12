import '@mantine/core/styles.css';
import { Metadata } from 'next';
import { Container, MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';

export const metadata: Metadata = {
  title: 'GitHub repos API UI',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Container pt="40" pb="100" size="lg">
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
