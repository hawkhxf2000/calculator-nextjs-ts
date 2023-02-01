import {createMocks} from 'node-mocks-http';
import handler from "../pages/api/calcFunction";

describe('/api/calFunction', () => {
    test('return result with add function', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: '1',
                numberB: '2',
                operator: '+'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                result: 3
            })
        )
    });

    test('return result with sub function', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: '3',
                numberB: '1',
                operator: '-'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                result: 2
            })
        )
    });

    test('return result with multiply function', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: '2',
                numberB: '2',
                operator: '*'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                result: 4
            })
        )
    });

    test('return result with division function', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: '4',
                numberB: '2',
                operator: '/'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                result: 2
            })
        )
    })

    test('should return error when miss a number', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: null,
                numberB: 2,
                operator: '/'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toBe('There must be two numbers for calculation');
    });

    test('should return error when miss operator', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: 4,
                numberB: 2,
                operator: null
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toBe('There must be a operator');
    });

    test('should return error when division with 0', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: 4,
                numberB: 0,
                operator: '/'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toBe('Division by 0');
    });

    test('should return error when operator is not correct', async () =>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                numberA: 4,
                numberB: 0,
                operator: '&'
            },
        });

        await handler(req,res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toBe('The operator is not correct');
    });
})