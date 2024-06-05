import React, { memo } from 'react';
import { Position } from 'reactflow';
import OneToOneHandle from './OneToOneHandle';

const StartNode = () => {
    return (
        <div style={{ background: 'white', padding: 16, border: '1px solid black' }}>
            <OneToOneHandle 
                type="source" 
                id="sourceStart"
                position={Position.Right} 
                isConnectable={1} 
            />
            <div>Start</div>
        </div>
    );
};

export default memo(StartNode);
