import gql from "graphql-tag";

export const QUERY = {
    FIND_ALL: gql`
  query {
  jobs {
    id,
    source,
    destination,
    description,
    companies {
      name,
      id
    }
  }
}
`,
    FIND_JOB_BY_ID: gql`
  query Job( $jobId: Int! ) {
    jobs(where: {id: {_eq: $jobId}}) {
    id,
    source,
    destination,
    description,
    companies {
      name,
      id
    }
    }
  }
`,
    FIND_ALL_BY_DRIVER_ID_AND_STATUS: gql`
        query jobByDriverId($driver: Int! $status: String!) {
            job_drivers(where: {driver_id:{_eq: $driver} status:{_eq: $status}}) {
                jobs {
                    id,
                    description,
                    source,
                    destination
                },
                status
            }
        }
    `
};


export const SUBSCRIPTION = {
    ALL_BY_DRIVER_ID_AND_STATUS: gql`
        subscription jobByDriverId($driver: Int! $status: String!) {
            job_drivers(where: {driver_id:{_eq: $driver} status:{_eq: $status}}) {
                jobs {
                    id,
                    description,
                    source,
                    destination
                },
                status
            }
        }
    `
};

export const MUTATION = {
    APPLY_FOR_JOB: gql`
mutation applyJob($driver: Int!, $job: Int!, $status: String!) {
    insert_job_drivers(objects:[
    {driver_id: $driver, job_id: $job, status: $status}
  ]) {
    returning {
      drivers {
        name
      }, jobs {
        id
      }
    }
  }
}
`
};
