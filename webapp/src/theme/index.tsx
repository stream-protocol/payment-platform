import React from "react";
import { ConfigProvider, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const withTheme = (node: JSX.Element) => (
    <>
      <ConfigProvider
         theme={{
            token: {
              colorPrimary: '#007bff',
            },
            components: {
              Menu: {
                iconSize: 20,
                fontSize: 16
              },
            },
            algorithm: defaultAlgorithm
          }}
      >
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
          }}
        >
          {node}
        </ConfigProvider>
      </ConfigProvider>
    </>
  )

export default withTheme;