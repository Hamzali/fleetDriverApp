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
