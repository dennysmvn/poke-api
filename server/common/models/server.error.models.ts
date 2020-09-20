const ServerErrors = {
  NotFound: {
    statusCode: 404,
    data: {
      errors: [
        {
          code: '001',
          message: 'Route not found.',
        },
      ],
    },
  },
  InternalServerError: {
    statusCode: 500,
    data: {
      errors: [
        {
          code: '002',
          message: 'Unmapped error.',
        },
      ],
    },
  },
  UnprocessableEntity: {
    statusCode: 422,
    data: {
      errors: [
        {
          code: '003',
          message: '',
        },
      ],
    },
  },
};

export default ServerErrors;
