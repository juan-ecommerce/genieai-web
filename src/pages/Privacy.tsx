export default function Privacy() {
  return (
    <section className="section prose-page">
      <p className="eyebrow">CLEAR BY DESIGN</p>
      <h1>
        Your details.
        <br />
        Handled with purpose.
      </h1>
      <p className="page-description">
        How this website handles conversations and project enquiries.
      </p>
      <h2>Project enquiries</h2>
      <p>
        When you submit an enquiry, your name, email, optional company, and
        project message are sent to Juan at juan@avancedev.com through the
        configured email provider. Those details are used to respond to your
        enquiry. The form asks for your agreement before sending.
      </p>
      <h2>AI conversations</h2>
      <p>
        Ask Genie uses OpenRouter to obtain AI responses. Your submitted
        messages are passed to OpenRouter and the selected model provider.
        Please share only information you are comfortable sending to these
        services. Avoid confidential or sensitive details. Provider data
        handling is governed by their own policies and the model selected by the
        site operator.
      </p>
      <h2>Website storage</h2>
      <p>
        This implementation keeps your chat and unsent enquiry in the current
        page session. It does not save conversations in a website database or
        browser storage. The API uses temporary request counters for rate
        limiting. Infrastructure and email providers may maintain their own
        operational records.
      </p>
      <h2>Questions</h2>
      <p>
        Contact <a href="mailto:juan@avancedev.com">juan@avancedev.com</a> with
        questions about an enquiry or your information, or call{" "}
        <a href="tel:+46793348387">+46 79 3348387</a>.
      </p>
    </section>
  );
}
